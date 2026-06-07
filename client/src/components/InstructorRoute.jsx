import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const InstructorRoute = () => {
  const { user, isLoading } = useSelector((state) => state.auth);

  if (isLoading) return null;

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "instructor") return <Navigate to="/" replace />;

  return <Outlet />;
};

export default InstructorRoute;
