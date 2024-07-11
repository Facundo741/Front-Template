import React from "react";
import { useAuth } from "../context/UserContext";
import { Navigate, Route } from "react-router-dom";

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Element /> : <Navigate to="/login" replace />}
    />
  );
};

export default ProtectedRoute;
