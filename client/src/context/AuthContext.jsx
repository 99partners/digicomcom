
import React, { createContext, useContext, useState, useEffect } from 'react';
import AUTH_CONFIG from '../config/auth.config';
import apiService from '../config/api.config';
import { toast } from 'react-toastify';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    validateSession();
  }, []);

  const validateSession = async () => {
    const token = localStorage.getItem(AUTH_CONFIG.adminTokenKey);
    
    // If no token exists, don't make the request
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await apiService.get('/api/system/account/status');

      if (response.success) {
        setUser(response.user);
      } else {
        // If the response wasn't successful, clear the token
        localStorage.removeItem(AUTH_CONFIG.adminTokenKey);
        setUser(null);
      }
    } catch (error) {
      console.error('Session validation error:', error);
      
      // Handle network errors
      if (error.code === 'ERR_NETWORK') {
        toast.error('Unable to connect to server. Please check your connection.');
      } 
      // Handle unauthorized errors
      else if (error.response?.status === 401) {
        localStorage.removeItem(AUTH_CONFIG.adminTokenKey);
        setUser(null);
      }
      // Handle other errors
      else if (!error.message?.includes('ERR_BLOCKED_BY_CLIENT')) {
        toast.error('Authentication error. Please try logging in again.');
        localStorage.removeItem(AUTH_CONFIG.adminTokenKey);
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (data) => {
    if (data.token) {
      localStorage.setItem(AUTH_CONFIG.adminTokenKey, data.token);
    }
    setUser(data.user);
    return data;
  };

  const logout = async () => {
    try {
      const response = await apiService.post('/api/system/account/logout');

      if (!response.success) {
        throw new Error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
      if (error.message?.includes('ERR_BLOCKED_BY_CLIENT')) {
        console.warn('Logout request blocked by ad blocker, clearing local state anyway');
      } else {
        toast.error('Logout failed, but your session will be cleared locally.');
      }
    } finally {
      localStorage.removeItem(AUTH_CONFIG.adminTokenKey);
      setUser(null);
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
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

export default AuthContext;