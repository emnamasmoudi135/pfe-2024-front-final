import React, { useState } from 'react';
import { Card, CardContent, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import ComputerIcon from '@mui/icons-material/Computer';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const VMCard = ({ vm, onSelectVM, onStartVM, onStopVM }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card 
      sx={{ 
        cursor: 'pointer', 
        backgroundColor: 'white', 
        borderRadius: '15px', 
        margin: '1rem', 
        boxShadow: '0 4px 8px ',
        maxWidth: '18rem',
        padding: '20px',
      }}
      onClick={() => onSelectVM(vm)}
    >
      <CardContent sx={{ textAlign: 'center', position: 'relative' }}>
        <IconButton
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleMenuClick}
          sx={{ 
            position: 'absolute',
            top: 0,
            right: 0,
            color: '#3664AD',
          }}
        >
          <MoreVertIcon />
        </IconButton>
        
        <ComputerIcon sx={{ fontSize: 40, color: '#3664AD' }} />
        <Typography variant="h5" sx={{ marginTop: '1rem' }}>{vm.name}</Typography>
        <Typography variant="body2" sx={{ marginTop: '0.5rem' }}>
          <strong>Status:</strong> {vm.status}
        </Typography>
        
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => { onStartVM(vm); handleMenuClose(); }}>Start</MenuItem>
          <MenuItem onClick={() => { onStopVM(vm); handleMenuClose(); }}>Stop</MenuItem>
        </Menu>
      </CardContent>
    </Card>
  );
};

export default VMCard;
