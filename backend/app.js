import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import UrlRoutes from "./routes/urlRoute.js";
import ShortUrl from "./models/short_url.model.js";
import LoginRoutes from './routes/loginRoute.js'; 

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors({
  origin: ["https://shortify-two.vercel.app"],
   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

app.use("/api/create", UrlRoutes);
app.use('/api', LoginRoutes); 

app.get("/:short_url", async (req, res) => {
  try {
    const { short_url } = req.params;
    const url = await ShortUrl.findOneAndUpdate(
      { short_url },
      { $inc: { clicks: 1 } },
      { new: true }
    );

    if (!url) return res.status(404).send("Short URL not found");

    res.redirect(url.full_url);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

app.get("/", (req, res) => {
  res.send("URL Shortener is running!");
});

if (!process.env.MONGO_URI) {
  console.error("MONGO_URI is missing. Set it in Render environment variables!");
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });
