// src/services/authService.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000';

export const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
};

export const signup = async (username, email, password) => {
    const response = await axios.post(`${API_URL}/signup`, { username, email, password });
    return response.data;
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
};

