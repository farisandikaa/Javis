import React, { useState, useEffect, useContext } from "react";
import api from "../api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import FullPageLoader from "../components/FullPageLoader";

export default function Dashboard() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/dashboard");
        setMessage(res.data.message);
      } catch {
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  const handleLogout = async () => {
    setLogoutLoading(true);
    setTimeout(async () => {
      await logout();
      navigate("/login");
      setLogoutLoading(false);
    }, 1000); 
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 px-4 transition-colors duration-300" data-aos="fade-up">
      {(loading || logoutLoading) && <FullPageLoader />}
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl text-center transition-all duration-300">
        <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100 tracking-wide">Dashboard</h2>
        <p className="mb-2 text-gray-700 dark:text-gray-200 text-lg" data-aos="fade-left">{message}</p>
            <p className="mb-6 text-gray-700 dark:text-gray-200 text-lg" data-aos="fade-right">
                Ini adalah hasil dari tes teknis web programmer challange yang dibuat oleh PT.Javis Teknologi Albarokah
            </p>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-xl font-semibold shadow-md transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
