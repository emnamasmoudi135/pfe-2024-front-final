// src/routes/AdminRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    return token && role === 'admin' ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default AdminRoute;
