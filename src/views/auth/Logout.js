// src/views/auth/Logout.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/authService';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const performLogout = async () => {
            try {
                await logout();
                localStorage.removeItem('token');
                localStorage.removeItem('role');
                navigate('/auth/login');
            } catch (error) {
                console.error('Error logging out:', error);
                navigate('/auth/login');
            }
        };

        performLogout();
    }, [navigate]);

    return null;
};

export default Logout;
