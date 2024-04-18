// ProtectedRoute.js

import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../AuthContext";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { userData } = useAuth();

  return (
    <Route
      {...rest}
      render={props =>
        userData ? (
          <Component {...props} />
        ) : (
          <Redirect to={{
            pathname: "/login",
            state: { from: props.location }
          }} />
        )
      }
    />
  );
};

export default ProtectedRoute;
