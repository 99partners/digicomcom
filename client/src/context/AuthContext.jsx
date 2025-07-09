import { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '../config/api.config';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const userToken = localStorage.getItem('authToken');
      const adminToken = localStorage.getItem('adminToken');

      if (!userToken && !adminToken) {
        setIsLoading(false);
        return;
      }

      if (adminToken) {
        const response = await axiosInstance.get('/api/admin/verify');
        if (response.data.success) {
          setIsAdmin(true);
          setIsAuthenticated(true);
          setUser(response.data.admin);
        } else {
          handleLogout();
        }
      } else if (userToken) {
        const response = await axiosInstance.get('/api/auth/verify');
        if (response.data.success) {
          setIsAuthenticated(true);
          setUser(response.data.user);
        } else {
          handleLogout();
        }
      }
    } catch (error) {
      console.error('Auth check error:', error);
      handleLogout();
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (token, userData, isAdminLogin = false) => {
    if (isAdminLogin) {
      localStorage.setItem('adminToken', token);
      setIsAdmin(true);
    } else {
      localStorage.setItem('authToken', token);
    }
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('adminToken');
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  const value = {
    user,
    isAuthenticated,
    isAdmin,
    isLoading,
    handleLogin,
    handleLogout,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;