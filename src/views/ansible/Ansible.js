import React, { useEffect, useState } from 'react';
import { Container, Button, Grid, Paper, Typography, Box, Table, TableBody, TableCell, TableContainer, TableRow, IconButton, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreatePlaybook from './CreatePlaybook';
import ExecutePlaybook from './ExecutePlaybook';
import AnsibleService from '../../services/ansibleService';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useNavigate } from 'react-router-dom';

const Ansible = () => {
  const [playbooks, setPlaybooks] = useState([]);
  const [filteredPlaybooks, setFilteredPlaybooks] = useState([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [executeModalOpen, setExecuteModalOpen] = useState(false);
  const [selectedPlaybook, setSelectedPlaybook] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletePlaybookName, setDeletePlaybookName] = useState('');
  const [confirmDeletePlaybookName, setConfirmDeletePlaybookName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaybooks = async () => {
      const data = await AnsibleService.listPlaybooks();
      setPlaybooks(data[1]);
      setFilteredPlaybooks(data[1]);
    };

    fetchPlaybooks();
  }, []);

  const handlePlaybookClick = async (playbook) => {
    navigate(`/playbook/${playbook}`);
    const content = await AnsibleService.getPlaybookDetail(playbook);
    setSelectedPlaybook(playbook);
  };

  const handleEditPlaybook = (playbook) => {
    navigate(`/edit-playbook/${playbook}`);
  };

  const handleExecutePlaybook = (playbook) => {
    setSelectedPlaybook(playbook);
    setExecuteModalOpen(true);
  };

  const handleSavePlaybook = async (name, content) => {
    try {
      await AnsibleService.createPlaybook(name, content);
      toast.success('Playbook created successfully!');
      setCreateModalOpen(false);
      const data = await AnsibleService.listPlaybooks();
      setPlaybooks(data[1]);
      setFilteredPlaybooks(data[1]);
    } catch (error) {
      toast.error('Error saving playbook');
      console.error('Error saving playbook:', error);
    }
  };

  const handleDeletePlaybook = async () => {
    if (deletePlaybookName === confirmDeletePlaybookName) {
      try {
        await AnsibleService.deletePlaybook(deletePlaybookName);
        toast.success('Playbook deleted successfully!');
        setDeleteDialogOpen(false);
        const data = await AnsibleService.listPlaybooks();
        setPlaybooks(data[1]);
        setFilteredPlaybooks(data[1]);
      } catch (error) {
        toast.error('Error deleting playbook');
        console.error('Error deleting playbook:', error);
      }
    } else {
      toast.error('Playbook names do not match');
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value === '') {
      setFilteredPlaybooks(playbooks);
    } else {
      const filtered = playbooks.filter((playbook) =>
        playbook.toLowerCase().includes(event.target.value.toLowerCase())
      );
      setFilteredPlaybooks(filtered);
    }
  };

  const openDeleteDialog = (playbook) => {
    setDeletePlaybookName(playbook);
    setConfirmDeletePlaybookName('');
    setDeleteDialogOpen(true);
  };

  return (
    <Container>
      <ToastContainer />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }}>
        <TextField
          label="Search playbook"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          sx={{ flexGrow: 1, mr: 2 }}
        />
        <Button 
          variant="contained" 
          sx={{ backgroundColor: '#3664AD', color: 'white', '&:hover': { backgroundColor: '#3664AD' } }} 
          onClick={() => setCreateModalOpen(true)}
        >
          Create Playbook
        </Button>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3, borderRadius: '15px 15px 0 0', backgroundColor: '#d95ca9', color: 'white' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h4" gutterBottom>Playbooks</Typography>
            </Box>
          </Paper>
          <Paper sx={{ p: 0, borderRadius: '0 0 15px 15px' }}>
            <TableContainer>
              <Table>
                <TableBody>
                  {filteredPlaybooks.map((playbook, index) => (
                    <TableRow
                      key={index}
                      hover
                      style={{ cursor: 'pointer' }}
                      onClick={() => handlePlaybookClick(playbook)}
                    >
                      <TableCell>{playbook}</TableCell>
                      <TableCell align="right">
                        <IconButton onClick={(event) => { event.stopPropagation(); handleExecutePlaybook(playbook); }} sx={{ color: '#3664AD' }}>
                          <PlayArrowIcon />
                        </IconButton>
                        <IconButton onClick={() => handleEditPlaybook(playbook)} sx={{ color: '#3664AD' }}>
                        <EditIcon />
                      </IconButton>
                        <IconButton onClick={(event) => { event.stopPropagation(); openDeleteDialog(playbook); }} sx={{ color: '#3664AD' }}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
      <CreatePlaybook open={createModalOpen} onClose={() => setCreateModalOpen(false)} onSave={handleSavePlaybook} />
      <ExecutePlaybook playbookName={selectedPlaybook} open={executeModalOpen} onClose={() => setExecuteModalOpen(false)} />
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please type the name of the playbook <strong>{deletePlaybookName}</strong> to confirm deletion.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Playbook Name"
            fullWidth
            value={confirmDeletePlaybookName}
            onChange={(e) => setConfirmDeletePlaybookName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeletePlaybook} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Ansible;
