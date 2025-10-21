import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import FullPageLoader from "../components/FullPageLoader";
import { ThemeContext } from "../context/ThemeContext";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [linkLoading, setLinkLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!form.username || !form.email || !form.password) {
      setMsg("Semua field wajib diisi");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setMsg("Format email tidak valid");
      return;
    }


    setLoading(true);
    const MIN_SPINNER_TIME = 2000; 
    const startTime = Date.now();

    try {
      const res = await api.post("/auth/register", form);
      setMsg(res.data.message);

      const elapsed = Date.now() - startTime;
      const remaining = MIN_SPINNER_TIME - elapsed;

      setTimeout(() => {
        navigate("/login", { state: { fromRegister: true } });
        setLoading(false);
      }, remaining > 0 ? remaining : 0);
    } catch (err) {
      setMsg(err.response?.data?.message || "Register gagal");
      setLoading(false);
    }
  };

  return (
    <div className={`${darkMode ? "dark" : ""} min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 transition-colors duration-300`}>
      {(loading || linkLoading) && <FullPageLoader />}
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl transition-all duration-300" data-aos="zoom-in">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100 tracking-wide">Register</h2>
          <button
            onClick={toggleDarkMode}
            className="text-gray-500 dark:text-gray-300 px-3 py-1 border rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {darkMode ? "🌞" : "🌙"}
          </button>
        </div>

        {msg && <p className="mb-4 text-center text-red-500">{msg}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 transition" data-aos="fade-right"
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 transition" data-aos="fade-left"
          />
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 transition" data-aos="fade-up"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 transition" data-aos="fade-right"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 rounded-xl font-semibold shadow-md transition disabled:opacity-50" data-aos="fade-up"
            disabled={loading}
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
          Sudah punya akun?{" "}
          <span
            onClick={() => {
              setLinkLoading(true);
              setTimeout(() => navigate("/login"), 300);
            }}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Login di sini
          </span>
        </p>
      </div>
    </div>
  );
}
