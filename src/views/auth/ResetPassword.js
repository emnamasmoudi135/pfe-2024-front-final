// src/views/auth/ResetPassword.js
import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Container, Box, Card } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { resetPassword } from '../../services/authService';




const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    useEffect(() => {
        document.body.style.backgroundColor = '#DFE8F6';
        return () => {
            document.body.style.backgroundColor = null; // Reset background color on cleanup
        };
    }, []);

    
    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await resetPassword(token, newPassword);
            setMessage(response.message);
            navigate('/auth/login'); // Redirige l'utilisateur vers la page de connexion après la réinitialisation du mot de passe
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.error);
            } else {
                setError('Failed to reset password. Please try again.');
            }
        }
    };

    return (
        <Container maxWidth="xs" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Card style={{ padding: '20px', borderRadius: '10px', width: '100%' }}>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <form onSubmit={handleResetPassword} style={{ width: '100%' }}>
                        <Typography variant="h5" align="center" gutterBottom>
                            Reset Password
                        </Typography>
                        <TextField
                            fullWidth
                            label="New Password"
                            margin="normal"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            label="Confirm Password"
                            margin="normal"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {error && <Typography color="error" variant="body2">{error}</Typography>}
                        {message && <Typography color="primary" variant="body2">{message}</Typography>}
                        <Button
                            fullWidth
                            variant="contained"
                            type="submit"
                            style={{ backgroundColor: '#3664AD', color: '#fff', marginTop: '20px' }}
                        >
                            Reset Password
                        </Button>
                    </form>
                </Box>
            </Card>
        </Container>
    );
};

export default ResetPassword;
