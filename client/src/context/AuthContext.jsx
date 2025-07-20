import { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance, { API_CONFIG } from '../config/api.config';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('authToken');
      const adminToken = localStorage.getItem('adminToken');

      if (!token && !adminToken) {
        setLoading(false);
        return;
      }

      // Check admin auth first
      if (adminToken) {
        try {
          const response = await axiosInstance.get('/api/admin/auth-check');
          if (response.data.success) {
            setUser({ 
              role: 'admin',
              isAdmin: true,
              ...response.data.admin 
            });
            setIsAuthenticated(true);
            return;
          }
        } catch (adminError) {
          console.error('Admin auth check failed:', adminError);
          localStorage.removeItem('adminToken');
          // Continue to check user auth if admin auth fails
        }
      }

      // Check regular user auth
      if (token) {
        try {
          const authResponse = await axiosInstance.get('/api/auth/is-auth');
          if (authResponse.data.success) {
            const userResponse = await axiosInstance.get('/api/user/data');
            if (userResponse.data.success) {
              setUser(userResponse.data.userData);
              setIsAuthenticated(true);
            } else {
              handleLogout();
            }
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
        localStorage.removeItem('authToken'); // Clear user token if exists
      } else {
        localStorage.setItem('authToken', token);
        localStorage.removeItem('adminToken'); // Clear admin token if exists
      }
      
      setUser(userData);
      setIsAuthenticated(true);
      await checkAuthStatus(); // Refresh user data after login
    } catch (error) {
      console.error('Login handler error:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('adminToken');
    setUser(null);
    setIsAuthenticated(false);
  };

  const refreshUserData = async () => {
    try {
      const response = await axiosInstance.get('/api/user/data');
      if (response.data.success) {
        setUser(response.data.userData);
      }
    } catch (error) {
      console.error('Error refreshing user data:', error);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      isAuthenticated,
      handleLogin,
      handleLogout,
      checkAuthStatus,
      refreshUserData
    }}>
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