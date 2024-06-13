import React, { useState, useEffect } from 'react';
import UserTableService from '../../services/userTableService';
import { Container, Grid, Paper, Typography, Box, Table, TableBody, TableCell, TableContainer, TableRow, TableHead, Select, MenuItem } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await UserTableService.getUsers();
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      await UserTableService.updateUserRole(userId, newRole);
      setUsers(users.map(user => user._id === userId ? { ...user, role: newRole } : user));
      toast.success('Role updated successfully!');
    } catch (error) {
      console.error('Error updating user role:', error);
      toast.error('Failed to update role');
    }
  };

  return (
    <Container>
      <ToastContainer />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3, borderRadius: '15px 15px 0 0', backgroundColor: '#d95ca9', color: 'white' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h4" gutterBottom>User Management</Typography>
            </Box>
          </Paper>
          <Paper sx={{ p: 0, borderRadius: '0 0 15px 15px' }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: '#3664AD', fontSize: '1.2rem', fontWeight: 'bold' }}>Username</TableCell>
                    <TableCell sx={{ color: '#3664AD', fontSize: '1.2rem', fontWeight: 'bold' }}>Email</TableCell>
                    <TableCell sx={{ color: '#3664AD', fontSize: '1.2rem', fontWeight: 'bold' }}>Role</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Select
                          value={user.role}
                          onChange={(e) => handleRoleChange(user._id, e.target.value)}
                          sx={{ backgroundColor: 'white', borderRadius: '4px' }}
                        >
                          <MenuItem value="user">User</MenuItem>
                          <MenuItem value="admin">Admin</MenuItem>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserTable;
