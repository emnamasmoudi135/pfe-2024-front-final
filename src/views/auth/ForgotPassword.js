// src/views/auth/ForgotPassword.js
import React, { useState ,useEffect } from 'react';
import { TextField, Button, Typography, Container, Box, Card } from '@mui/material';
import { forgotPassword } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        document.body.style.backgroundColor = '#DFE8F6';
        return () => {
            document.body.style.backgroundColor = null; // Reset background color on cleanup
        };
    }, []);
    
    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        try {
            const response = await forgotPassword(email);
            setMessage(response.message);
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.error);
            } else {
                setError('Failed to send reset email. Please try again.');
            }
        }
    };

    return (
        <Container maxWidth="xs" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Card style={{ padding: '20px', borderRadius: '10px', width: '100%' }}>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <form onSubmit={handleForgotPassword} style={{ width: '100%' }}>
                        <Typography variant="h5" align="center" gutterBottom>
                            Forgot Password
                        </Typography>
                        <TextField
                            fullWidth
                            label="Email Address"
                            margin="normal"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {error && <Typography color="error" variant="body2">{error}</Typography>}
                        {message && <Typography color="primary" variant="body2">{message}</Typography>}
                        <Button
                            fullWidth
                            variant="contained"
                            type="submit"
                            style={{ backgroundColor: '#3664AD', color: '#fff', marginTop: '20px' }}
                        >
                            Send Reset Link
                        </Button>
                    </form>
                    <Typography variant="body2" align="center" style={{ marginTop: '10px' }}>
                        Remembered your password? <span style={{ color: '#3664AD', cursor: 'pointer' }} onClick={() => navigate('/auth/login')}>Login</span>
                    </Typography>
                </Box>
            </Card>
        </Container>
    );
};

export default ForgotPassword;
