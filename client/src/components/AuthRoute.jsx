import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const AuthRoute = () => {
  const { user, isLoading } = useSelector((state) => state.auth);

  if (isLoading) return null;

  return !user ? <Outlet /> : <Navigate to="/" replace />;
};

export default AuthRoute;
