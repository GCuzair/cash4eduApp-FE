import React, { createContext, useState, useEffect } from 'react';
import { Storage } from '../utils/Storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load token and user on app start
  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      const storedToken = await Storage.getToken();
      const storedUser = await Storage.getUser();
      
      if (storedToken) {
        setToken(storedToken);
        setUser(storedUser);
      }
    } catch (error) {
      console.error('Error loading auth:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Login function
  const login = async (token, userData) => {
    try {
      await Storage.setToken(token);
      await Storage.setUser(userData);
      setToken(token);
      setUser(userData);
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await Storage.clearAuth();
      setToken(null);
      setUser(null);
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false, error: error.message };
    }
  };

  // Check if user is logged in
  const isLoggedIn = () => {
    return token !== null;
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isLoading,
        login,
        logout,
        isLoggedIn,
      }}>
      {children}
    </AuthContext.Provider>
  );
};