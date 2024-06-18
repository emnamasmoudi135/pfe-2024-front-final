import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const AdminRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        console.log('No token found, redirecting to login.');
        return <Navigate to="/auth/login" />;
    }

    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        
        console.log('Decoded token:', decodedToken);
        console.log('Token expiration time:', decodedToken.exp);
        console.log('Current time:', currentTime);
        console.log('Role in token:', decodedToken.sub.role);

        if (decodedToken.exp < currentTime) {
            console.log('Token is expired, redirecting to login.');
            localStorage.removeItem('token');
            return <Navigate to="/auth/login" />;
        }

        if (decodedToken.sub.role !== 'admin') {
            console.log(`User role is ${decodedToken.sub.role}, not admin. Redirecting to login.`);
            return <Navigate to="/auth/login" />;
        }
    } catch (e) {
        console.log('Error decoding token:', e);
        return <Navigate to="/auth/login" />;
    }

    return children;
};

export default AdminRoute;
