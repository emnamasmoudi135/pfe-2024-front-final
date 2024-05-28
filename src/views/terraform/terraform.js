import React, { useState } from 'react';
import { Box, Button, Typography, Card, CardContent, CardActions, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import BuildIcon from '@mui/icons-material/Build';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DeleteIcon from '@mui/icons-material/Delete';

const Terraform = () => {
  const [initOpen, setInitOpen] = useState(false);
  const [applyOpen, setApplyOpen] = useState(false);
  const [destroyOpen, setDestroyOpen] = useState(false);

  const handleInitOpen = () => {
    setInitOpen(true);
  };

  const handleInitClose = () => {
    setInitOpen(false);
  };

  const handleApplyOpen = () => {
    setApplyOpen(true);
  };

  const handleApplyClose = () => {
    setApplyOpen(false);
  };

  const handleDestroyOpen = () => {
    setDestroyOpen(true);
  };

  const handleDestroyClose = () => {
    setDestroyOpen(false);
  };

  const buttonColor = '#3664AD';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Terraform
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <Card sx={{ maxWidth: 345, borderRadius: 4 }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <BuildIcon sx={{ fontSize: 40, mb: 2, color: buttonColor }} />
            <Typography variant="h5" component="div">
              Terraform Init
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
              Initialize a new or existing Terraform configuration.
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: 'center' }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: buttonColor, color: 'white', '&:hover': { backgroundColor: buttonColor } }}
              onClick={handleInitOpen}
            >
              Init
            </Button>
          </CardActions>
        </Card>
        <Card sx={{ maxWidth: 345, borderRadius: 4 }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <PlayArrowIcon sx={{ fontSize: 40, mb: 2, color: buttonColor }} />
            <Typography variant="h5" component="div">
              Terraform Apply
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
              Apply the changes required to reach the desired state.
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: 'center' }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: buttonColor, color: 'white', '&:hover': { backgroundColor: buttonColor } }}
              onClick={handleApplyOpen}
            >
              Apply
            </Button>
          </CardActions>
        </Card>
        <Card sx={{ maxWidth: 345, borderRadius: 4 }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <DeleteIcon sx={{ fontSize: 40, mb: 2, color: buttonColor }} />
            <Typography variant="h5" component="div">
              Terraform Destroy
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
              Destroy the Terraform-managed infrastructure.
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: 'center' }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: buttonColor, color: 'white', '&:hover': { backgroundColor: buttonColor } }}
              onClick={handleDestroyOpen}
            >
              Destroy
            </Button>
          </CardActions>
        </Card>
      </Box>

      {/* Init Dialog */}
      <Dialog open={initOpen} onClose={handleInitClose}>
        <DialogTitle>Terraform Init</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Initialize a new or existing Terraform configuration.
          </DialogContentText>
          {/* Add additional content or form inputs here if needed */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleInitClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleInitClose} color="primary">
            Init
          </Button>
        </DialogActions>
      </Dialog>

      {/* Apply Dialog */}
      <Dialog open={applyOpen} onClose={handleApplyClose}>
        <DialogTitle>Terraform Apply</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Apply the changes required to reach the desired state.
          </DialogContentText>
          {/* Add additional content or form inputs here if needed */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleApplyClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleApplyClose} color="primary">
            Apply
          </Button>
        </DialogActions>
      </Dialog>

      {/* Destroy Dialog */}
      <Dialog open={destroyOpen} onClose={handleDestroyClose}>
        <DialogTitle>Terraform Destroy</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Destroy the Terraform-managed infrastructure.
          </DialogContentText>
          {/* Add additional content or form inputs here if needed */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDestroyClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDestroyClose} color="primary">
            Destroy
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Terraform;
