import React, { useEffect, useState } from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import axios from 'axios';

const SamplePage = () => {
  const [playbooks, setPlaybooks] = useState([]);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedPlaybook, setSelectedPlaybook] = useState('');
  const [playbookContent, setPlaybookContent] = useState('');

  useEffect(() => {
    const fetchPlaybooks = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/list-playbooks');
        console.log('API response:', response); // Log the whole response
        if (response.data && response.data.length > 1 && Array.isArray(response.data[1])) {
          console.log('Playbooks:', response.data[1]); // Log the playbooks
          setPlaybooks(response.data[1]);
        } else {
          console.log('No playbooks found.');
          setPlaybooks([]);
        }
      } catch (err) {
        console.error('Error fetching playbooks:', err);
        setError('Failed to retrieve playbooks');
      }
    };

    fetchPlaybooks();
  }, []);

  const handleViewDetails = async (playbookName) => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/playbook-detail/${playbookName}`);
      console.log('Playbook details:', response.data);
      setSelectedPlaybook(playbookName);
      setPlaybookContent(response.data.content);
      setOpen(true); // Open the modal
    } catch (err) {
      console.error('Error fetching playbook details:', err);
    }
  };

  const handleDeletePlaybook = async (playbookName) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/delete-playbook/${playbookName}`);
      setPlaybooks(playbooks.filter(playbook => playbook !== playbookName));
    } catch (err) {
      console.error('Error deleting playbook:', err);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <PageContainer title="Ansible Management" description="This is a sample page">
      <DashboardCard title="Playbooks">
        {error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Playbook Name</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {playbooks.length > 0 ? (
                  playbooks.map((playbook, index) => (
                    <TableRow key={index}>
                      <TableCell>{playbook}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleViewDetails(playbook)}>
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDeletePlaybook(playbook)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2}>No playbooks available</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DashboardCard>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>Playbook Details - {selectedPlaybook}</DialogTitle>
        <DialogContent>
          <Typography>{playbookContent}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
};

export default SamplePage;
