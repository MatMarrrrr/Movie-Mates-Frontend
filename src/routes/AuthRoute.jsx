import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const AuthRoute = ({ component: Component, isAuthRequired }) => {
  const { user } = useUser();

  if (isAuthRequired && !user) {
    return <Navigate to="/login" />;
  }

  if (!isAuthRequired && user) {
    return <Navigate to="/" />;
  }

  return <Component />;
};

export default AuthRoute;
