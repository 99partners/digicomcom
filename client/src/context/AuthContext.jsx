import { createContext, useContext, useState, useEffect } from 'react';
import { mockData } from '../config/mockData';
import { AUTH_CONFIG } from '../config/auth.config';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing mock auth token
    const token = localStorage.getItem(AUTH_CONFIG.tokenKey);
    const adminToken = localStorage.getItem(AUTH_CONFIG.adminTokenKey);
    
    if (token || adminToken) {
      checkAuthStatus();
    } else {
      setLoading(false);
    }
  }, []);

  const checkAuthStatus = async () => {
    const adminToken = localStorage.getItem(AUTH_CONFIG.adminTokenKey);
    if (adminToken) {
      setUser({ ...mockData.auth.admin });
    } else {
      const userToken = localStorage.getItem(AUTH_CONFIG.tokenKey);
      if (userToken) {
        setUser({ ...mockData.auth.user });
      }
    }
    setLoading(false);
  };

  const handleLogin = async (token, userData, isAdmin = false) => {
    const tokenKey = isAdmin ? AUTH_CONFIG.adminTokenKey : AUTH_CONFIG.tokenKey;
    localStorage.setItem(tokenKey, token);
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem(AUTH_CONFIG.tokenKey);
    localStorage.removeItem(AUTH_CONFIG.adminTokenKey);
    setUser(null);
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
      {children}
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