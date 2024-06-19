// src/services/authService.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000';

export const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
};

export const forgotPassword = async (email) => {
  const response = await axios.post(`${API_URL}/forgot-password`, { email });
  return response.data;
};


export const resetPassword = async (token, newPassword) => {
    const response = await axios.post(`${API_URL}/reset-password`, { token, new_password: newPassword });
    return response.data;
};

export const signup = async (username, email, password) => {
    const response = await axios.post(`${API_URL}/signup`, { username, email, password });
    return response.data;
};

export const logout = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}/logout`, {}, {
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};
