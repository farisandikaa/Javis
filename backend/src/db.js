const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// untuk debug koneksi database
(async () => {
  try {
    const conn = await pool.getConnection();
    console.log("Koneksi ke database berhasil!");
    conn.release();
  } catch (err) {
    console.error("Gagal konek ke database:", err.message);
  }
})();

module.exports = pool;
