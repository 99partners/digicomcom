import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

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
        const response = await axios.get('http://localhost:5050/api/admin/dashboard-stats', {
          withCredentials: true
        });
        if (response.data.success) {
          setUser({ role: 'admin' });
          return;
        }
      }

      // Check regular user auth
      const userToken = localStorage.getItem('authToken');
      if (userToken) {
        const response = await axios.get('http://localhost:5050/api/user/profile', {
          withCredentials: true
        });
        if (response.data.success) {
          setUser(response.data.user);
        } else {
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

  const handleLogin = (token, userData, isAdmin = false) => {
    if (isAdmin) {
      localStorage.setItem('adminToken', token);
    } else {
      localStorage.setItem('authToken', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('adminToken');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  const value = {
    user,
    loading,
    handleLogin,
    handleLogout,
    isAuthenticated: !!user,
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