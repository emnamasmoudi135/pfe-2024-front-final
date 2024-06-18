import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getMenuItems } from '../MenuItems';
import {jwtDecode} from 'jwt-decode';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';

const DynamicMenu = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  let role = 'user'; // Par défaut, supposons que le rôle est 'user'
  if (token) {
    const decodedToken = jwtDecode(token);
    role = decodedToken.role;
  }

  const menuItems = getMenuItems(role);

  return (
    <List>
      {menuItems.map(item => (
        <ListItem button key={item.id} onClick={() => navigate(item.href)}>
          <ListItemIcon><item.icon /></ListItemIcon>
          <ListItemText primary={item.title} />
        </ListItem>
      ))}
    </List>
  );
};

export default DynamicMenu;
