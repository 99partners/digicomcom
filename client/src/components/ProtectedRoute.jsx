import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import axiosInstance from '../config/api.config';

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isPartnerRoute = location.pathname === '/partner';
  const [hasPartnerRequest, setHasPartnerRequest] = useState(false);
  const [checkingRequest, setCheckingRequest] = useState(true);

  useEffect(() => {
    const checkPartnerRequest = async () => {
      if (user && isPartnerRoute) {
        try {
          const response = await axiosInstance.get('/api/partner/has-request');
          setHasPartnerRequest(response.data.hasRequest);
        } catch (error) {
          console.error('Error checking partner request:', error);
          setHasPartnerRequest(false);
        }
        setCheckingRequest(false);
      } else {
        setCheckingRequest(false);
      }
    };

    checkPartnerRequest();
  }, [user, isPartnerRoute]);

  if (loading || (isPartnerRoute && checkingRequest)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle admin routes
  if (isAdminRoute) {
    if (!user || user.role !== 'admin') {
      return <Navigate to="/admin/login" replace state={{ from: location }} />;
    }
    return children;
  }

  // Handle partner route
  if (isPartnerRoute) {
    if (!user) {
      return <Navigate to="/partnerlogin" replace state={{ from: location }} />;
    }

    if (!hasPartnerRequest) {
      return <Navigate to="/partnerlogin" replace state={{ 
        from: location,
        message: "Please complete the partner request form to access the partner dashboard."
      }} />;
    }
  }

  // For all other protected routes
  if (!user) {
    return <Navigate to="/partnerlogin" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute; 