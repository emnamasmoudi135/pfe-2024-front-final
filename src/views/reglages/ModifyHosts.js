import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { Editor } from '@monaco-editor/react';
import AnsibleService from 'src/services/ansibleService';

const ModifyHosts = ({ open, handleClose }) => {
  const [hostsContent, setHostsContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (open) {
      const fetchHostsContent = async () => {
        try {
          const response = await AnsibleService.getHostsContent();
          setHostsContent(response.content);
        } catch (error) {
          console.error('Error fetching hosts content:', error);
          setMessage('Error fetching hosts content.');
        }
      };

      fetchHostsContent();
    }
  }, [open]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await AnsibleService.modifyHosts(hostsContent);
      setMessage('Hosts file updated successfully.');
      handleClose();  // Close the dialog on success
    } catch (error) {
      console.error('Error modifying hosts file:', error);
      setMessage('Error modifying hosts file.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Modify hosts.ini</DialogTitle>
      <DialogContent>
        <Editor
          height="400px"
          defaultLanguage="ini"
          value={hostsContent}
          onChange={(value) => setHostsContent(value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" disabled={loading}>
          {loading ? 'Modifying...' : 'Save'}
        </Button>
      </DialogActions>
      {message && (
        <Typography variant="body1" color={message.includes('Error') ? 'error' : 'success'}>
          {message}
        </Typography>
      )}
    </Dialog>
  );
};

export default ModifyHosts;
