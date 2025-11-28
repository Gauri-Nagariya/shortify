import express from 'express';
import Login from '../models/loginSchema.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { User_name, Email, Password } = req.body;
  if (!User_name || !Email || !Password) {
    return res.status(400).json({ msg: 'All fields required' });
  }

  try {
    const existing = await Login.findOne({ Email });
    if (existing) return res.status(400).json({ msg: 'Email already registered' });

    const newUser = new Login({ User_name, Email, Password });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  const { Email, Password } = req.body;
  if (!Email || !Password) return res.status(400).json({ msg: 'Email and Password required' });

  try {
    const user = await Login.findOne({ Email, Password });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

export default router;
