import React, { useEffect } from "react";
import { Navigate, Route } from "react-router";
import { useAuth } from "../context/AuthContext";
import { notify } from "../utils/notification";

export const ProtectedRoutes = ({ path, ...props }) => {
 
  const { login } = useAuth();

  useEffect(() => {
    if (!login) {
      notify("Login first 😅");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return login ? (
    <Route {...props} path={path} />
  ) : (
    <Navigate state={{ from: path }} replace to="/login" />
  );
};
