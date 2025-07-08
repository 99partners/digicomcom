import { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance, { API_BASE_URL } from '../config/api.config';
import { toast } from 'react-toastify';

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
          console.log('Checking admin auth status...');
          const response = await axiosInstance.get('/api/admin/dashboard-stats');
          if (response.data.success) {
            console.log('Admin auth successful');
            setUser({ role: 'admin', ...response.data.admin });
            setLoading(false);
            return;
          }
        } catch (adminError) {
          console.error('Admin auth check failed:', adminError);
          if (adminError.response?.status === 401) {
            toast.error('Admin session expired. Please login again.');
          }
          localStorage.removeItem('adminToken');
        }
      }

      // Check regular user auth
      const userToken = localStorage.getItem('authToken');
      if (userToken) {
        try {
          console.log('Checking user auth status...');
          const response = await axiosInstance.get('/api/user/data');
          if (response.data.success) {
            console.log('User auth successful');
            setUser(response.data.userData);
          } else {
            console.log('User auth failed, logging out');
            handleLogout();
          }
        } catch (userError) {
          console.error('User auth check failed:', userError);
          if (userError.response?.status === 401) {
            toast.error('Session expired. Please login again.');
          }
          handleLogout();
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      handleLogout();
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (token, userData, isAdmin = false) => {
    try {
      console.log(`Handling ${isAdmin ? 'admin' : 'user'} login...`);
      
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
      toast.error('Login failed. Please try again.');
      handleLogout();
      return false;
    }
  };

  const handleLogout = () => {
    console.log('Logging out...');
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
    checkAuthStatus,
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