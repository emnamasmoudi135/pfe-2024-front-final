import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, CircularProgress, Typography } from '@mui/material';
import AnsibleService from '../../services/ansibleService';

const ExecutePlaybook = ({ playbookName, open, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [executionResult, setExecutionResult] = useState('');

  const executePlaybook = async () => {
    setLoading(true);
    try {
      const response = await AnsibleService.executePlaybook(playbookName);
      setExecutionResult(response[1]); // Assuming the result is in the second item of the response array
    } catch (error) {
      setExecutionResult('Error executing playbook');
    } finally {
      setLoading(false);
    }
  };

  const getStyledText = (text) => {
    return text.split('\n').map((line, index) => {
      if (line.includes('ok=')) {
        return <Typography key={index} style={{ color: 'green' }}>{line}</Typography>;
      } else if (line.includes('failed=')) {
        return <Typography key={index} style={{ color: 'red' }}>{line}</Typography>;
      } else {
        return <Typography key={index}>{line}</Typography>;
      }
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Execute Playbook: {playbookName}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {loading ? <CircularProgress /> : getStyledText(executionResult)}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
        <Button onClick={executePlaybook} color="primary" disabled={loading}>
          Execute
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExecutePlaybook;
