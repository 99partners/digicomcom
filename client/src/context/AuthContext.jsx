import { createContext, useContext, useState, useEffect } from 'react';
import { AUTH_CONFIG } from '../config/auth.config';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdminVerified, setIsAdminVerified] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const adminToken = localStorage.getItem(AUTH_CONFIG.adminTokenKey);
      const userToken = localStorage.getItem(AUTH_CONFIG.tokenKey);

      if (adminToken) {
        // Verify admin token with backend
        try {
          const response = await axios.get('http://localhost:5050/api/admin/verify', {
            headers: {
              Authorization: `Bearer ${adminToken}`
            }
          });

          if (response.data.success) {
            setUser({ 
              ...response.data.user,
              role: 'admin' 
            });
            setIsAdminVerified(true);
          } else {
            handleLogout();
          }
        } catch (error) {
          console.error('Admin verification failed:', error);
          handleLogout();
        }
      } else if (userToken) {
        // Handle regular user token
        setUser({ role: 'user', token: userToken });
      }
    } catch (error) {
      console.error('Auth status check failed:', error);
      handleLogout();
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (token, userData, isAdmin = false) => {
    try {
      const tokenKey = isAdmin ? AUTH_CONFIG.adminTokenKey : AUTH_CONFIG.tokenKey;
      localStorage.setItem(tokenKey, token);
      
      if (isAdmin) {
        setIsAdminVerified(true);
      }
      
      setUser({
        ...userData,
        token
      });
    } catch (error) {
      console.error('Login error:', error);
      handleLogout();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(AUTH_CONFIG.tokenKey);
    localStorage.removeItem(AUTH_CONFIG.adminTokenKey);
    setUser(null);
    setIsAdminVerified(false);
  };

  const value = {
    user,
    loading,
    isAdminVerified,
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