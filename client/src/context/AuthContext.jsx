
import React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import { AUTH_CONFIG } from '../config/auth.config';
import axios from 'axios';
import { API_URL } from '../config/api.config';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem(AUTH_CONFIG.tokenKey);

      if (token) {
        try {
          const response = await axios.get(`${API_URL}${AUTH_CONFIG.endpoints.profile}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              'X-Requested-With': 'XMLHttpRequest',
              'Accept': 'application/json'
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
      }
    } catch (error) {
      console.error('Auth status check failed:', error);
      handleLogout();
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (token, userData) => {
    try {
      localStorage.setItem(AUTH_CONFIG.tokenKey, token);
      console.log('Login user data:', userData);
      setUser(userData);
      
      // Fetch full profile after login
      const response = await axios.get(`${API_URL}${AUTH_CONFIG.endpoints.profile}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-Requested-With': 'XMLHttpRequest',
          'Accept': 'application/json'
        }
      });

      if (response.data.success) {
        console.log('Updated profile data:', response.data);
        setUser(response.data.user);
      }
    } catch (error) {
      console.error('Login error:', error);
      handleLogout();
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(AUTH_CONFIG.tokenKey);
    setUser(null);
    setLoading(false);
    window.location.href = AUTH_CONFIG.loginPath;
  };

  const value = {
    user,
    loading,
    error,
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