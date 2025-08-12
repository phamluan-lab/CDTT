import React, { useEffect } from 'react';
import authService from '../../services/authService';

const PrivateRoute = ({ children }) => {
  useEffect(() => {
    const isAuthenticated = authService.isAuthenticated();
    if (!isAuthenticated) {
      window.location.href = '/admin/login';
    }
  }, []);

  const isAuthenticated = authService.isAuthenticated();
  if (!isAuthenticated) {
    return null;
  }

  return children;
};

export default PrivateRoute;