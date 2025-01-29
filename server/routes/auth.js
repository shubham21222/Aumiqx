const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Admin login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(404).json({ message: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id }, 'e4c2f9d6bbfc5db0b4a3ed789ac5f59a4db0ae4b2e7d8b7b69e8a123e64a9d90f0a1d2b4e6c7f8g9h0a1b2c3d4e5f6g7', { expiresIn: '1h' });
  res.json({ token });
});

// Create admin user (only for first time setup)
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({ username, password: hashedPassword });
  await newUser.save();

  res.status(201).json({ message: 'Admin created successfully' });
});

module.exports = router;
