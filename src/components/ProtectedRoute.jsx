import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { userData, loading } = useAuth();

  if (loading) {
    return <div></div>;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        userData ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;
