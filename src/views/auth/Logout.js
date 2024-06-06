// src/views/Logout.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/authService';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const performLogout = async () => {
            await logout();
            navigate('/login');
        };
        performLogout();
    }, [navigate]);

    return (
        <div>
            <h2>Logging out...</h2>
        </div>
    );
};

export default Logout;
