import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../api";

export default function ProtectedRoute({ children }) {
  const { setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/dashboard");
        setUser(res.data.user || { username: "User" });
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [setUser]);

  if (loading) return <p>Loading...</p>;
  if (!isAuthenticated) return <Navigate to="/login" />;

  return children;
}
