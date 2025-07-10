
import React, { createContext, useContext, useState, useEffect } from 'react';
import AUTH_CONFIG from '../config/auth.config';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    validateSession();
  }, []);

  const validateSession = async () => {
    try {
      const response = await fetch(AUTH_CONFIG.endpoints.validateToken, {
        headers: AUTH_CONFIG.headers,
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      }
    } catch (error) {
      console.error('Session validation error:', error);
      if (!error.message.includes('ERR_BLOCKED_BY_CLIENT')) {
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (data) => {
    setUser(data.user);
    return data;
  };

  const logout = async () => {
    try {
      const response = await fetch(AUTH_CONFIG.endpoints.logout, {
        method: 'POST',
        headers: AUTH_CONFIG.headers,
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
      if (error.message.includes('ERR_BLOCKED_BY_CLIENT')) {
        console.warn('Logout request blocked by ad blocker, clearing local state anyway');
      }
    } finally {
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