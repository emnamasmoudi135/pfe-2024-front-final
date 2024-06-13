// src/components/AdminRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const AdminRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        return <Navigate to="/auth/login" />;
    }

    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime || decodedToken.role !== 'admin') {
            localStorage.removeItem('token');
            return <Navigate to="/auth/login" />;
        }
    } catch (e) {
        return <Navigate to="/auth/login" />;
    }

    return children;
};

export default AdminRoute;
