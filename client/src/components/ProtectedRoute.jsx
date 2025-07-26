import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children }) => {
  const { user, loading, isAuthenticated } = useAuth();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isDashboardRoute = location.pathname.startsWith('/dashboard');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Check for authentication token in localStorage as additional security
  const authToken = localStorage.getItem('authToken');
  const adminToken = localStorage.getItem('adminToken');

  // For dashboard routes, ensure user is authenticated and has valid token
  if (isDashboardRoute) {
    if (!user || !isAuthenticated || !authToken) {
      console.log('Unauthorized dashboard access attempt, redirecting to partner login');
      return <Navigate to="/partnerlogin" replace state={{ from: location }} />;
    }
    
    // Ensure dashboard users are not admin users (admin should use admin panel)
    if (user.role === 'admin') {
      return <Navigate to="/admin" replace />;
    }
  }

  // For admin routes
  if (isAdminRoute) {
    if (!user || !adminToken) {
      return <Navigate to="/admin/login" replace state={{ from: location }} />;
    }
    
    // Ensure admin users have admin role
    if (!user.role || user.role !== 'admin') {
      return <Navigate to="/admin/login" replace state={{ from: location }} />;
    }
  }

  // General authentication check for any protected route
  if (!user || !isAuthenticated) {
    return <Navigate to={isAdminRoute ? "/admin/login" : "/partnerlogin"} replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;