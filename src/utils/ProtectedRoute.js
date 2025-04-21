import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const ProtectedRoute = ({ children, requiredAccess }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has access to this route
  if (requiredAccess && !user.access.includes(requiredAccess)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;