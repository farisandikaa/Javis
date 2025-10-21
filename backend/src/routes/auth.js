const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const router = express.Router();

// Rate limiter untuk login
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: { message: 'Terlalu banyak percobaan login, coba lagi nanti.' }
});

// REGISTER
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.status(400).json({ message: 'Semua field wajib diisi' });

    // cek user existing
    const [existing] = await pool.query('SELECT id FROM users WHERE email = ? OR username = ?', [email, username]);
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Username atau email sudah digunakan' });
    }

    // hash password
    const hash = await bcrypt.hash(password, 10);

    await pool.query(
      'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
      [username, email, hash]
    );

    res.json({ message: 'Registrasi berhasil' });
  } catch (err) {
    console.error('Error register:', err);
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
});

// LOGIN
router.post('/login', limiter, async (req, res) => {
  try {
    const { identifier, password } = req.body;
    if (!identifier || !password)
      return res.status(400).json({ message: 'Isi semua field' });

    const [rows] = await pool.query(
      'SELECT * FROM users WHERE email = ? OR username = ? LIMIT 1',
      [identifier, identifier]
    );

    if (rows.length === 0)
      return res.status(401).json({ message: 'User tidak ditemukan' });

    const user = rows[0];

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match)
      return res.status(401).json({ message: 'Password salah' });

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: true, // secure https
    });

    res.json({ message: 'Login sukses' });
  } catch (err) {
    console.error('Error login:', err);
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
});

// LOGOUT
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logout berhasil' });
});

module.exports = router;
