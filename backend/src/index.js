const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { requireAuth } = require('./middleware/authMiddleware');
const authRoutes = require('./routes/auth');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN,
  credentials: true
}));

// log setiap request yang masuk (buat debug)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// route utama
app.use('/api/auth', authRoutes);

// route default untuk cek server
app.get("/", (req, res) => {
  res.send("Backend Javis API berjalan dengan baik!");
});

// Protected route
app.get('/api/dashboard', requireAuth, (req, res) => {
  res.json({ message: `Selamat datang ${req.user.username}!` 
    });
});

// running server
app.listen(process.env.PORT, () => {
  console.log(`Server berjalan di port ${process.env.PORT}`);
  console.log('Routes terdaftar:');
  console.log('- GET /');
  console.log('- POST /api/auth/register');
  console.log('- POST /api/auth/login');
  console.log('- POST /api/auth/logout');
  console.log('- GET /api/dashboard (protected)');
});
