
import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const ProtectedRoute = ({ children }) => {
  const { user, setShowLogin } = useContext(AppContext);

  useEffect(() => {
    // Only show login modal if the user is explicitly null
    if (!user) {
      setShowLogin(true);
    }
  }, [user, setShowLogin]);

  if (!user) {
    return <Navigate to="/" replace />; // redirect to home
  }

  return children;
};

export default ProtectedRoute;

