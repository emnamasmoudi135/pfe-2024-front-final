import React from 'react';
import { Modal, Paper, Typography, Box, Button } from '@mui/material';
import Editor from '@monaco-editor/react';

const PlaybookDetail = ({ open, onClose, playbookContent, onEdit }) => {
  const handleEdit = () => {
    onEdit();
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Paper sx={{ p: 3, maxWidth: 800, margin: 'auto', marginTop: '5%', maxHeight: '80vh', overflowY: 'auto' }}>
        <Typography variant="h6" gutterBottom>Détails du Playbook</Typography>
        <Editor
          height="400px"
          defaultLanguage="yaml"
          value={playbookContent}
          options={{ readOnly: true }}
        />
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={handleEdit} sx={{ ml: 2 }}>
            Modifier
          </Button>
          <Button variant="contained" color="secondary" onClick={onClose} sx={{ ml: 2 }}>
            Fermer
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
};

export default PlaybookDetail;
