import React, { useState } from 'react';
import { Box, Button, Typography, Card, CardContent, CardActions } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import HostIcon from '@mui/icons-material/Dns';
import ModifyEnv from './ModifyEnv';
import ModifyHosts from './ModifyHosts';

const Settings = () => {
  const [envOpen, setEnvOpen] = useState(false);
  const [hostsOpen, setHostsOpen] = useState(false);

  const handleEnvOpen = () => {
    setEnvOpen(true);
  };

  const handleEnvClose = () => {
    setEnvOpen(false);
  };

  const handleHostsOpen = () => {
    setHostsOpen(true);
  };

  const handleHostsClose = () => {
    setHostsOpen(false);
  };

  const buttonColor = '#3664AD';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <Card sx={{ maxWidth: 345, borderRadius: 4 }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <SettingsIcon sx={{ fontSize: 40, mb: 2, color: buttonColor }} />
            <Typography variant="h5" component="div">
              Modify .Env
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
              Update environment variables in the .env file.
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: 'center' }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: buttonColor, color: 'white', '&:hover': { backgroundColor: buttonColor } }}
              onClick={handleEnvOpen}
            >
              Modify
            </Button>
          </CardActions>
        </Card>
        <Card sx={{ maxWidth: 345, borderRadius: 4 }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <HostIcon sx={{ fontSize: 40, mb: 2, color: buttonColor }} />
            <Typography variant="h5" component="div">
              Modify Hosts
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
              Update the hosts file to manage server addresses.
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: 'center' }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: buttonColor, color: 'white', '&:hover': { backgroundColor: buttonColor } }}
              onClick={handleHostsOpen}
            >
              Modify
            </Button>
          </CardActions>
        </Card>
      </Box>
      <ModifyEnv open={envOpen} handleClose={handleEnvClose} />
      <ModifyHosts open={hostsOpen} handleClose={handleHostsClose} />
    </Box>
  );
};

export default Settings;
