import React from 'react';
import { Button } from '@mui/material';
import AnsibleService from '../../services/ansibleService';
import { toast } from 'react-toastify';

const DeletePlaybook = ({ name, onDelete }) => {
  const handleDelete = async () => {
    try {
      await AnsibleService.deletePlaybook(name);
      toast.success('Playbook deleted successfully!');
      onDelete(name);
    } catch (error) {
      toast.error('Error deleting playbook');
      console.error('Error deleting playbook:', error);
    }
  };

  return (
    <Button variant="contained" color="secondary" onClick={handleDelete}>
      Delete Playbook
    </Button>
  );
};

export default DeletePlaybook;
