import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

const VMCard = ({ vm, onSelectVM }) => {
  return (
    <Card onClick={() => onSelectVM(vm)} sx={{ cursor: 'pointer', backgroundColor: 'white', borderRadius: '15px', margin: '1rem' }}>
      <CardContent>
        <Typography variant="h5">{vm.name}</Typography>
        <Typography variant="body2">
          <strong>Status:</strong> {vm.status}
        </Typography>
        <Button 
          onClick={() => onSelectVM(vm)} 
          sx={{ backgroundColor: '#6CC51D', color: 'white', marginTop: '1rem', '&:hover': { backgroundColor: '#5ba914' } }}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default VMCard;
