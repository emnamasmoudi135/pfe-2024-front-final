// src/components/RoleBasedRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const RoleBasedRoute = ({ roles }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/auth/login" />;
  }

  const user = jwtDecode(token);

  if (roles && roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default RoleBasedRoute;
