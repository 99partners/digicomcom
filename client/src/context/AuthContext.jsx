import { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance, { API_CONFIG } from '../config/api.config';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing auth token in localStorage
    const token = localStorage.getItem('authToken');
    const adminToken = localStorage.getItem('adminToken');
    
    if (token || adminToken) {
      checkAuthStatus();
    } else {
      setLoading(false);
    }
  }, []);

  const checkAuthStatus = async () => {
    try {
      // Check admin auth first
      const adminToken = localStorage.getItem('adminToken');
      if (adminToken) {
        try {
          const response = await axiosInstance.get('/api/admin/dashboard-stats');
          if (response.data.success) {
            setUser({ role: 'admin', ...response.data.admin });
            setLoading(false);
            return;
          }
        } catch (adminError) {
          console.error('Admin auth check failed:', adminError);
          localStorage.removeItem('adminToken');
        }
      }

      // Check regular user auth
      const userToken = localStorage.getItem('authToken');
      if (userToken) {
        try {
          const response = await axiosInstance.get('/api/user/data');
          if (response.data.success) {
            setUser(response.data.userData);
          } else {
            handleLogout();
          }
        } catch (userError) {
          console.error('User auth check failed:', userError);
          handleLogout();
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (token, userData, isAdmin = false) => {
    try {
      if (isAdmin) {
        localStorage.setItem('adminToken', token);
      } else {
        localStorage.setItem('authToken', token);
      }
      
      // Update axios instance headers
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Set user data
      setUser(userData);

      // Verify the token immediately after login
      await checkAuthStatus();
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      handleLogout();
      return false;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('adminToken');
    delete axiosInstance.defaults.headers.common['Authorization'];
    setUser(null);
  };

  const value = {
    user,
    loading,
    handleLogin,
    handleLogout,
    isAuthenticated: !!user,
    checkAuthStatus, // Export this so components can manually check auth status
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