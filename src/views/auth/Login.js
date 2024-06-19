// src/views/auth/Login.js
import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Container, Box, Card } from '@mui/material';
import { login } from '../../services/authService';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../../layouts/full/shared/logo/Logo';
import {jwtDecode} from 'jwt-decode';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get('token');
        if (token) {
            try {
                if (token.split('.').length === 3) {
                    localStorage.setItem('token', token);
                    const user = jwtDecode(token);
                    localStorage.setItem('role', user.role);
                    navigate('/dashboard');
                } else {
                    throw new Error('Invalid token format');
                }
            } catch (err) {
                console.error('Login confirmation failed:', err);
                setError('Login confirmation failed. Please try again.');
            }
        }
    }, [location, navigate]);

    useEffect(() => {
        document.body.style.backgroundColor = '#DFE8F6';
        return () => {
            document.body.style.backgroundColor = null; // Reset background color on cleanup
        };
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        try {
            const response = await login(email, password);
            if (response.message) {
                setMessage(response.message);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.error);
            } else {
                setError('Login failed. Please try again.');
            }
        }
    };

    return (
        <Container maxWidth="xs" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Card style={{ padding: '20px', borderRadius: '10px', width: '100%' }}>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
                        <Logo />
                    </Box>
                    <form onSubmit={handleLogin} style={{ width: '100%' }}>
                        <TextField
                            fullWidth
                            label="Email Address"
                            margin="normal"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            margin="normal"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {error && <Typography color="error" variant="body2">{error}</Typography>}
                        {message && <Typography color="primary" variant="body2">{message}</Typography>}
                        <Button
                            fullWidth
                            variant="contained"
                            type="submit"
                            style={{ backgroundColor: '#3664AD', color: '#fff', marginTop: '20px' }}
                        >
                            Login
                        </Button>
                    </form>
                    <Typography variant="body2" align="center" style={{ marginTop: '10px' }}>
                        Don't have an account? <span style={{ color: '#3664AD', cursor: 'pointer' }} onClick={() => navigate('/auth/signup')}>Sign Up</span>
                    </Typography>
                    <Typography variant="body2" align="center" style={{ marginTop: '10px' }}>
                    Forgot your password? <span style={{ color: '#3664AD', cursor: 'pointer' }} onClick={() => navigate('/auth/forgot-password')}>Reset Password</span>
                </Typography>
                </Box>
            </Card>
        </Container>
    );
};

export default Login;
