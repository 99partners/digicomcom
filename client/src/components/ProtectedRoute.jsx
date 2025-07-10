import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import axios from 'axios';

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
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

  // Handle admin routes
  if (isAdminRoute) {
    if (!user || user.role !== 'admin') {
      return <Navigate 
        to="/admin/login" 
        replace 
        state={{ 
          from: location,
          message: "Please log in with admin credentials to access this area."
        }} 
      />;
    }
    return children;
  }

  // Handle dashboard routes
  if (isDashboardRoute) {
    if (!user) {
      return <Navigate 
        to="/login" 
        replace 
        state={{ from: location }} 
      />;
    }
    return children;
  }

  // For all other protected routes
  if (!user) {
    return <Navigate 
      to="/login" 
      replace 
      state={{ from: location }} 
    />;
  }

  return children;
};

export default ProtectedRoute; 