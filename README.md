# PT. Javis Teknologi Albarokah - Web Programmer Challange

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?style=flat&logo=javascript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.3-06B6D4?style=flat&logo=tailwind-css)
![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=flat&logo=node.js)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=flat&logo=mysql)

Project ini adalah hasil tes teknis web programmer challange, berisi halaman **Login**, **Register**, dan **Dashboard** dengan fitur lengkap termasuk autentikasi, dark mode, validasi form, dan animasi loading.
Di buat menggunakan **React.js**, **Node.js**, **Express**, dan **Tailwind CSS**, **JWT** authentication dan **MySQL** database.

---

## ✨ Features

- Form Login (Email/Username & Password)
- Form Register (Username, Email, Password) dengan validasi wajib dan format email
- Show/Hide password
- Dark mode toggle
- Full page loader / spinner saat login, register, dan logout
- Dashboard protected route (hanya bisa diakses jika login valid)
- Responsive untuk mobile & desktop
- Animasi scroll menggunakan AOS
- Backend menggunakan Node.js (Express / Next.js API Routes)
- Database: MySQL / Redis (untuk session / rate limit)
- Password hashing menggunakan bcrypt
- JWT + HttpOnly cookie untuk autentikasi

---

## 📂 Project Structure
```
JAVIS/
├── backend
│   ├── node_modules
│   ├── package.json
│   ├── package-lock.json
│   └── src
└── frontend
    ├── build
    ├── node_modules
    ├── package.json
    ├── package-lock.json
    ├── postcss.config.js
    ├── public
    ├── README.md
    ├── src
    └── tailwind.config.js
```

---

## 🛠️ Getting Started

### 1. Clone this repository
```
git clone https://github.com/farisandikaa/javis.git
cd javis
```

### 2. Install dependencies
```
composer install
npm install && npm run dev
```

### 3. Start Frontend
```
cd frontend
npm install
npm start
```

### 4. Start Backend Connection
```
cd backend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

---

## 📜 License
This project is licensed under the [MIT License](LICENSE).

---

## 📬 Contact
If you’d like to collaborate or have any inquiries, feel free to reach out:

- 📧 Email: **farisandika2111@gmail.com**
- 💼 LinkedIn: [linkedin.com/in/farisandikaputra](https://linkedin.com/in/farisandikaputra)
- 🐙 GitHub: [github.com/farisandikaa](https://github.com/farisandikaa)
