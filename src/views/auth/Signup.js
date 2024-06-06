// src/views/auth/Signup.js
import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Container, Box, Card } from '@mui/material';
import { signup } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import Logo from 'src/layouts/full/shared/logo/Logo';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        document.body.style.backgroundColor = '#DFE8F6';
        return () => {
            document.body.style.backgroundColor = null; // Reset background color on cleanup
        };
    }, []);

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await signup(username, email, password);
            alert(response.message);
            navigate('/auth/login');
        } catch (error) {
            alert(error.response.data.error);
        }
    };

    return (
        <Container maxWidth="xs" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Card style={{ padding: '20px', borderRadius: '10px', width: '100%' }}>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
                        <Logo />
                    </Box>
                    <form onSubmit={handleSignup} style={{ width: '100%' }}>
                        <TextField
                            fullWidth
                            label="Name"
                            margin="normal"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
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
                        <Button
                            fullWidth
                            variant="contained"
                            type="submit"
                            style={{ backgroundColor: '#3664AD', color: '#fff', marginTop: '20px' }}
                        >
                            Sign Up
                        </Button>
                    </form>
                    <Typography variant="body2" align="center" style={{ marginTop: '10px' }}>
                        Already have an Account? <span style={{ color: '#3664AD', cursor: 'pointer' }} onClick={() => navigate('/auth/login')}>Sign In</span>
                    </Typography>
                </Box>
            </Card>
        </Container>
    );
};

export default Signup;
