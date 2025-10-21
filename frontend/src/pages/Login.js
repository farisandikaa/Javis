import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api, { checkAuth } from "../api";
import { AuthContext } from "../context/AuthContext";
import FullPageLoader from "../components/FullPageLoader";

export default function Login() {
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [linkLoading, setLinkLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true" || false
  );

  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const verifyLogin = async () => {
      const data = await checkAuth();
      if (data?.message) navigate("/dashboard");
    };
    verifyLogin();
  }, [navigate]);

  useEffect(() => {
    if (location.state?.fromRegister) setMsg("Register berhasil, silahkan login!");
  }, [location]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });


  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!form.identifier.trim() || !form.password.trim()) {
      setMsg("Semua field wajib diisi");
      return;
    }
    if (form.identifier.includes("@") && !isValidEmail(form.identifier)) {
      setMsg("Format email tidak valid");
      return;
    }

    setLoading(true);
    setMsg("");
    const MIN_SPINNER_TIME = 2000;
    const startTime = Date.now();

    try {
      const res = await api.post("/auth/login", form);
      setMsg(res.data.message);
      setUser({ username: form.identifier });

      const elapsed = Date.now() - startTime;
      const remaining = MIN_SPINNER_TIME - elapsed;

      setTimeout(() => {
        navigate("/dashboard");
        setLoading(false);
      }, remaining > 0 ? remaining : 0);
    } catch (err) {
      setMsg(err.response?.data?.message || "Login gagal");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 transition-colors duration-300">
      {(loading || linkLoading) && <FullPageLoader />}
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl transition-all duration-300" data-aos="zoom-in">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 tracking-wide">Login</h2>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-gray-500 dark:text-gray-300 px-3 py-1 border rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {darkMode ? "🌞" : "🌙"}
          </button>
        </div>
        {msg && <p className="mb-4 text-center text-red-500">{msg}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="identifier"
            value={form.identifier}
            onChange={handleChange}
            placeholder="Email / Username"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 transition" data-aos="fade-right"
          />
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 transition" data-aos="fade-left"
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
            className="w-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-xl font-semibold shadow-md transition disabled:opacity-50" data-aos="fade-up"
            disabled={loading}
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
          Belum punya akun?{" "}
          <span
            onClick={() => {
              setLinkLoading(true);
              setTimeout(() => navigate("/register"), 300);
            }}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Daftar di sini
          </span>
        </p>
      </div>
    </div>
  );
}
