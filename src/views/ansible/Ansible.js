import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Paper,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Box
} from '@mui/material';
import AnsibleService from '../../services/ansibleService';

const Ansible = () => {
  const [playbooks, setPlaybooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaybooks = async () => {
      try {
        const data = await AnsibleService.listPlaybooks();
        if (data[0]) {
          setPlaybooks(data[1]);
        }
      } catch (error) {
        console.error('Error fetching playbooks:', error);
      }
    };

    fetchPlaybooks();
  }, []);

  const handlePlaybookClick = (playbookName) => {
    navigate(`/playbook/${playbookName}`);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper sx={{ p: 3, borderRadius: '15px', backgroundColor: '#e83e8c', color: 'white' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
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
  );
};

export default Ansible;
