// React
import React from "react";
// React Router
import { Navigate, useLocation } from "react-router-dom";
// React Firebase Hook
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
// Components
import Loading from "../Shared/Loading";

const RequireAuth = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default RequireAuth;
