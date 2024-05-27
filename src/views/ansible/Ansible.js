import React, { useEffect, useState } from 'react';
import { Container, Button, Grid, Paper, Typography, Box, Table, TableBody, TableCell, TableContainer, TableRow, IconButton } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreatePlaybook from './CreatePlaybook';
import AnsibleService from '../../services/ansibleService';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

const Ansible = () => {
  const [playbooks, setPlaybooks] = useState([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [playbookContent, setPlaybookContent] = useState('');
  const [selectedPlaybook, setSelectedPlaybook] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaybooks = async () => {
      const data = await AnsibleService.listPlaybooks();
      setPlaybooks(data[1]);
    };

    fetchPlaybooks();
  }, []);

  const handlePlaybookClick = async (playbook) => {
    navigate(`/playbook/${playbook}`);
    const content = await AnsibleService.getPlaybookDetail(playbook);
    setSelectedPlaybook(playbook);
    setPlaybookContent(content);
  };

  const handleEditPlaybook = (playbook) => {
    navigate(`/edit-playbook/${playbook}`);
  };

  const handleSavePlaybook = async (name, content) => {
    try {
      await AnsibleService.createPlaybook(name, content);
      toast.success('Playbook created successfully!');
      setCreateModalOpen(false);
      const data = await AnsibleService.listPlaybooks();
      setPlaybooks(data[1]);
    } catch (error) {
      toast.error('Error saving playbook');
      console.error('Error saving playbook:', error);
    }
  };

 

  const handleDeletePlaybook = async (playbook) => {
    try {
      await AnsibleService.deletePlaybook(playbook);
      toast.success('Playbook deleted successfully!');
      const data = await AnsibleService.listPlaybooks();
      setPlaybooks(data[1]);
    } catch (error) {
      toast.error('Error deleting playbook');
      console.error('Error deleting playbook:', error);
    }
  };

  return (
    <Container>
      <ToastContainer />
      <Button 
      variant="contained" 
      sx={{ backgroundColor: '#3664AD', color: 'white', '&:hover': { backgroundColor: '#3664AD' } }} 
      onClick={() => setCreateModalOpen(true)}
    >
      Créer Playbook
    </Button>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3, borderRadius: '15px', backgroundColor: '#d95ca9', color: 'white' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h4" gutterBottom>Playbooks</Typography>
             
            </Box>
          </Paper>
          <Paper sx={{ p: 3, borderRadius: '15px', mt: 2 }}>
            <TableContainer>
              <Table>
                <TableBody>
                  {playbooks.map((playbook, index) => (
                    <TableRow
                      key={index}
                      hover
                      style={{ cursor: 'pointer' }}
                      onClick={() => handlePlaybookClick(playbook)}
                    >
                      <TableCell>{playbook}</TableCell>
                      <TableCell align="right">
                      <Button onClick={() => handleEditPlaybook(playbook)}>Edit</Button>
                        <IconButton onClick={(event) => { event.stopPropagation(); handleDeletePlaybook(playbook); }} sx={{ color: '#3664AD' }}>
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
    </Container>
  );
};

export default Ansible;