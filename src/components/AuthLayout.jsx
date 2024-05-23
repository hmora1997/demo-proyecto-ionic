import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const AuthLayout = ({ children }) => {
  const { userData, loading } = useAuth();
  const location = useLocation();

  if (userData && location.pathname === '/login') {
    return <Redirect to="/menu" />;
  }

  return <>{children}</>;
};

export default AuthLayout;
