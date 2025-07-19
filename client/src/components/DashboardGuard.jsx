import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const DashboardGuard = ({ children }) => {
  const { user, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Only run checks after loading is complete
    if (loading) return;

    const authToken = localStorage.getItem('authToken');
    const isDashboardRoute = location.pathname.startsWith('/dashboard');

    // If this is a dashboard route but user is not properly authenticated
    if (isDashboardRoute) {
      if (!user || !isAuthenticated || !authToken) {
        console.log('Dashboard Guard: Unauthorized access detected, redirecting to partner login');
        toast.error('Please login to access the dashboard');
        navigate('/partnerlogin', { replace: true });
        return;
      }

      // If user is admin, redirect to admin panel
      if (user.role === 'admin') {
        console.log('Dashboard Guard: Admin user redirected to admin panel');
        navigate('/admin', { replace: true });
        return;
      }

      // Additional token validation
      if (!authToken || authToken === 'undefined' || authToken === 'null') {
        console.log('Dashboard Guard: Invalid token detected, redirecting to partner login');
        localStorage.removeItem('authToken');
        toast.error('Session expired. Please login again.');
        navigate('/partnerlogin', { replace: true });
        return;
      }
    }
  }, [user, loading, isAuthenticated, location.pathname, navigate]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Check authentication before rendering children
  const authToken = localStorage.getItem('authToken');
  const isDashboardRoute = location.pathname.startsWith('/dashboard');

  if (isDashboardRoute && (!user || !isAuthenticated || !authToken)) {
    // This will trigger the useEffect redirect, but we return null to prevent rendering
    return null;
  }

  return children;
};

export default DashboardGuard; 