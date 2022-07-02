// React
import React from "react";
// React Router
import { Navigate, useLocation } from "react-router-dom";
// React Firebase Hook
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { signOut } from "firebase/auth";
// Components
import Loading from "../Shared/Loading";
import useAdmin from "../../hooks/useAdmin";
const RequireAuth = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const [admin, adminIsLoading] = useAdmin(user);
  const location = useLocation();

  if (loading || adminIsLoading) {
    return <Loading />;
  }

  if (!user || !admin) {
    signOut(auth);
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default RequireAuth;
