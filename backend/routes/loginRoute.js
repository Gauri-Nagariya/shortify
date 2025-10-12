// const express = require('express');
// const router = express.Router();
// const mongoose = require('mongoose');

// const Login = require('../models/loginSchema'); // make sure path is correct

// // GET all users
// router.get('/', async (req, res) => {
//     try {
//         const users = await Login.find().sort({ User_name: 1 });
//         res.json(users);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });

// // CREATE new user
// router.post('/', async (req, res) => {
//     const { User_name, Email, Password } = req.body;

//     if (!User_name || !Email || !Password) {
//         return res.status(400).json({ msg: 'User_name, Email, and Password are required' });
//     }

//     const newUser = new Login({ User_name, Email, Password });

//     try {
//         const savedUser = await newUser.save();
//         res.status(201).json(savedUser);
//     } catch (err) {
//         console.error(err.message);
//         res.status(400).json({ msg: 'Failed to create user', error: err.message });
//     }
// });

// // DELETE user by ID
// router.delete('/:id', async (req, res) => {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(400).json({ msg: 'Invalid user ID' });
//     }

//     try {
//         const user = await Login.findByIdAndDelete(id);

//         if (!user) {
//             return res.status(404).json({ msg: 'User not found' });
//         }

//         res.json({ msg: 'Account deleted successfully', id });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });

// module.exports = router;



// routes/loginRoute.js
import express from 'express';
import Login from '../models/loginSchema.js';

const router = express.Router();

// ---------------------------
// REGISTER / SIGN UP
// ---------------------------
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

// ---------------------------
// LOGIN
// ---------------------------
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
