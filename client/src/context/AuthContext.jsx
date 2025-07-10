<<<<<<< HEAD
import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../config/api.config';
=======
import { createContext, useContext, useState, useEffect } from 'react';
import { AUTH_CONFIG } from '../config/auth.config';
import axios from 'axios';
import { API_URL } from '../config/api.config';
>>>>>>> c3997cf7adb7e39bc6c9d454ec4d3f7168c44a47

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
<<<<<<< HEAD
    // Check if user is logged in on mount
    const token = localStorage.getItem('token');
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response = await api.get('/api/auth/profile');
      setUser(response.data.user);
=======
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem(AUTH_CONFIG.tokenKey);

      if (token) {
        try {
          const response = await axios.get(`${API_URL}/api/auth/profile`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          if (response.data.success) {
            console.log('Profile data:', response.data);
            setUser(response.data.user);
          } else {
            handleLogout();
          }
        } catch (error) {
          console.error('Auth verification failed:', error);
          handleLogout();
        }
      } else {
        setLoading(false);
      }
>>>>>>> c3997cf7adb7e39bc6c9d454ec4d3f7168c44a47
    } catch (error) {
      console.error('Auth status check failed:', error);
      handleLogout();
    }
  };

  const handleLogin = async (token, userData) => {
    try {
      localStorage.setItem(AUTH_CONFIG.tokenKey, token);
      console.log('Login user data:', userData);
      setUser(userData);
      
      // Fetch full profile after login
      const response = await axios.get(`${API_URL}/api/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.success) {
        console.log('Updated profile data:', response.data);
        setUser(response.data.user);
      }
    } catch (error) {
      console.error('Login error:', error);
      handleLogout();
    } finally {
      setLoading(false);
    }
  };

<<<<<<< HEAD
  const login = async (email, password) => {
    try {
      setError(null);
      const response = await api.post('/api/auth/login', {
        email,
        password
      });

      const { token, user: userData } = response.data;
      localStorage.setItem('token', token);
      setUser(userData);
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      setError(error.response?.data?.message || 'An error occurred during login');
      return { success: false, error: error.response?.data?.message || 'Login failed' };
    }
  };

  const signup = async (userData) => {
    try {
      setError(null);
      const response = await api.post('/api/auth/signup', userData);
      return { success: true, message: response.data.message };
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred during signup');
      return { success: false, error: error.response?.data?.message || 'Signup failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
=======
  const handleLogout = () => {
    localStorage.removeItem(AUTH_CONFIG.tokenKey);
>>>>>>> c3997cf7adb7e39bc6c9d454ec4d3f7168c44a47
    setUser(null);
    setLoading(false);
    window.location.href = AUTH_CONFIG.loginPath;
  };

  const value = {
    user,
    loading,
    handleLogin,
    handleLogout,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};