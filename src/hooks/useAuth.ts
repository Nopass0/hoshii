// useAuth.js
import { useState, useEffect } from "react";
import { login, register, logout } from "../apiClient";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
      // Optionally, fetch user data here
    }
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const data = await login(username, password);
      setIsAuthenticated(true);
      setUser(data.user);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegister = async (login, password, name) => {
    try {
      const data = await register(login, password, name);
      setIsAuthenticated(true);
      setUser(data.user);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    isAuthenticated,
    user,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
  };
};
