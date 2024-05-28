import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { Editor } from '@monaco-editor/react';
import AnsibleService from 'src/services/ansibleService';

const ModifyEnv = ({ open, handleClose }) => {
  const [envContent, setEnvContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (open) {
      const fetchEnvContent = async () => {
        try {
          const response = await AnsibleService.getEnv();
          const formattedContent = Object.entries(response)
            .map(([key, value]) => `${key}=${value}`)
            .join('\n');
          setEnvContent(formattedContent);
        } catch (error) {
          console.error('Error fetching .env content:', error);
          setMessage('Error fetching .env content.');
        }
      };

      fetchEnvContent();
    }
  }, [open]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const contentLines = envContent.split('\n');
      const newContent = contentLines.reduce((acc, line) => {
        const [key, value] = line.split('=');
        acc[key] = value;
        return acc;
      }, {});
      await AnsibleService.modifyEnv(newContent);
      setMessage('Environment variables updated successfully.');
      handleClose();  // Close the dialog on success
    } catch (error) {
      console.error('Error modifying .env file:', error);
      setMessage('Error modifying .env file.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Modify .env</DialogTitle>
      <DialogContent>
        <Editor
          height="400px"
          defaultLanguage="ini"
          value={envContent}
          onChange={(value) => setEnvContent(value)}
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

export default ModifyEnv;
