import express from "express";
import { nanoid } from "nanoid";
import ShortUrl from "../models/short_url.model.js";

const router = express.Router();

const BASE_URL = process.env.VITE_BACKEND_URL || "http://localhost:4000";

router.post("/", async (req, res, next) => {
  try {
    const { full_url, userId } = req.body;
    if (!full_url) return res.status(400).json({ msg: "Full URL is required" });

    const shortCode = nanoid(7);

    const newShortUrl = new ShortUrl({
      full_url,
      short_url: shortCode,
      user: userId || null,
    });

    await newShortUrl.save();

    res.status(201).json({
      full_url: newShortUrl.full_url,
      short_url: newShortUrl.short_url,
      clicks: newShortUrl.clicks,
      short_link: `${BASE_URL}/${shortCode}`,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ msg: "Short URL already exists" });
    }
    next(err);
  }
});

router.get("/:short_url", async (req, res, next) => {
  try {
    const { short_url } = req.params;
    const url = await ShortUrl.findOneAndUpdate(
      { short_url },
      { $inc: { clicks: 1 } },
      { new: true }
    );

    if (!url) return res.status(404).json({ msg: "Short URL not found" });

    res.redirect(url.full_url);
  } catch (err) {
    next(err);
  }
});

export default router;
