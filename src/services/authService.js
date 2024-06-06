// src/services/authService.js
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const API_URL = 'http://127.0.0.1:5000';  // Assurez-vous que l'URL correspond à votre serveur

export const signup = async (username, email, password, role = 'user') => {
    const response = await axios.post(`${API_URL}/signup`, { username, email, password, role });
    return response.data;
};

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        if (response && response.data) {
            const { token } = response.data;
            localStorage.setItem('token', token);

            const user = jwtDecode(token);
            localStorage.setItem('role', user.role);
            
            return response.data;
        }
    } catch (error) {
        throw error;
    }
};

export const verifyEmail = async (token) => {
    const response = await axios.get(`${API_URL}/verify-email`, { params: { token } });
    return response.data;
};

export const confirmLogin = async (token) => {
    const response = await axios.get(`${API_URL}/confirm-login`, { params: { token } });
    return response.data;
};

export const logout = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    const response = await axios.post(`${API_URL}/logout`);
    return response.data;
};
