import React, { useEffect, useState } from 'react';
import { Container, Button, Grid, Paper, Typography, Box, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreatePlaybook from './CreatePlaybook';
import EditPlaybook from './EditPlaybook';
import AnsibleService from '../../services/ansibleService';
import { useNavigate } from 'react-router-dom';

const Ansible = () => {
  const [playbooks, setPlaybooks] = useState([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
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
    setEditModalOpen(true);
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

  const handleUpdatePlaybook = async (content) => {
    try {
      await AnsibleService.updatePlaybook(selectedPlaybook, content);
      toast.success('Playbook updated successfully!');
      setEditModalOpen(false);
      const data = await AnsibleService.listPlaybooks();
      setPlaybooks(data[1]);
    } catch (error) {
      toast.error('Error updating playbook');
      console.error('Error updating playbook:', error);
      throw error; // Make sure to throw the error to trigger the toast in EditPlaybook
    }
  };
  
  return (
    <Container>
    <Button variant="contained"  sx={{ backgroundColor: '#3664AD', color: 'white', '&:hover': { backgroundColor: '#3664AD' }, mr: 2 }}  onClick={() => setCreateModalOpen(true)}>
                Créer Playbook
              </Button>
      <ToastContainer />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3, borderRadius: '15px', backgroundColor: '#d95ca9', color: 'white' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h4" gutterBottom>Playbooks</Typography>
            </Box>
          </Paper>
          <Paper sx={{ p: 3, borderRadius: '15px' }}>
            <TableContainer>
              <Table>
                <TableBody>
                  {playbooks.map((playbook, index) => (
                    <TableRow
                      key={index}
                      onClick={() => handlePlaybookClick(playbook)}
                      style={{ cursor: 'pointer' }}
                    >
                      <TableCell>{playbook}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>

      <CreatePlaybook open={createModalOpen} onClose={() => setCreateModalOpen(false)} onSave={handleSavePlaybook} />
      <EditPlaybook open={editModalOpen} onClose={() => setEditModalOpen(false)} playbookContent={playbookContent} onSave={handleUpdatePlaybook} />
    </Container>
  );
};

export default Ansible;
