import React, { createContext, useState, useEffect } from "react";
import api from "../api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // cek status user udah login belom
    const checkAuth = async () => {
      try {
        const res = await api.get("/dashboard");
        setUser(res.data.message); 
      } catch {
        setUser(null);
      }
    };
    checkAuth();
  }, []);

  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
