import React, { useState, useEffect } from 'react';
import proxmoxService from 'src/services/proxmoxService';
import { Container, Typography, Button, Grid, Modal, TextField, Box, Paper, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Line, Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';import { toast } from 'react-toastify';
import VirtualMachineIcon from '@mui/icons-material/Computer'; // Utilisez l'icône de machine virtuelle appropriée
import 'react-toastify/dist/ReactToastify.css';

// Register necessary components for chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const VMDetails = ({ selectedVM, refreshVMs, onBack }) => {
  const [vmDetails, setVmDetails] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [updateData, setUpdateData] = useState({
    cores: 2,
    memory: 2048
  });
  const [deleteConfirmation, setDeleteConfirmation] = useState('');

  const [cpuUsageData, setCpuUsageData] = useState({ labels: [], datasets: [] });
  const [memoryUsageData, setMemoryUsageData] = useState({ labels: [], datasets: [] });
  const [diskUsageData, setDiskUsageData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchVMDetails = async () => {
      if (selectedVM && selectedVM.vmid) {
        const response = await proxmoxService.getVMStatus(selectedVM.node, selectedVM.vmid);
        console.log('Response from backend:', response);
        if (response && response[0] === true) {
          const details = response[1];
          setVmDetails(details);

          const labels = ['Current']; // Static label for current data point

          setCpuUsageData({
            labels,
            datasets: [
              {
                label: 'CPU Usage',
                data: [details.cpu * 100 || 0], // Convert to percentage and handle undefined
                borderColor: '#3664AD',
                backgroundColor: 'rgba(54, 100, 173, 0.6)',
                fill: true,
              }
            ]
          });
          setMemoryUsageData({
            labels,
            datasets: [
              {
                label: 'Memory Usage',
                data: [(details.mem / details.maxmem) * 100 || 0], // Convert to percentage and handle undefined
                borderColor: '#e83e8c',
                backgroundColor: 'rgba(232, 62, 140, 0.6)',
                fill: true,
              }
            ]
          });
          setDiskUsageData({
            labels,
            datasets: [
              {
                label: 'Disk Usage',
                data: [(details.disk / details.maxdisk) * 100 || 0], // Convert to percentage and handle undefined
                borderColor: '#3664AD',
                backgroundColor: 'rgba(54, 100, 173, 0.6)',
                fill: true,
              }
            ]
          });
        } else {
          console.error('Failed to fetch VM details');
        }
      }
    };
    fetchVMDetails();
  }, [selectedVM]);

  const handleUpdateVM = async () => {
    const response = await proxmoxService.updateVM(selectedVM.node, selectedVM.vmid, updateData);
    if (response && response[0] === true) {
      setShowUpdateModal(false);
      toast.success('VM updated successfully!');
      refreshVMs(); // Refresh the VM list
    } else {
      console.error('Failed to update VM');
      toast.error('Failed to update VM');
    }
  };

  const handleDeleteVM = async () => {
    if (deleteConfirmation === selectedVM.name) {
      const response = await proxmoxService.destroyVM(selectedVM.node, selectedVM.vmid);
      if (response && response[0] === true) {
        setShowDeleteModal(false);
        toast.success('VM deleted successfully!');
        refreshVMs(); // Refresh the VM list
      } else {
        console.error('Failed to delete VM');
        toast.error('Failed to delete VM');
      }
    } else {
      console.error('VM name does not match');
      toast.error('VM name does not match');
    }
  };

  return (
    <Container>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <IconButton onClick={onBack} sx={{ color: '#3664AD' }}>
          <ArrowBackIosIcon sx={{ fontSize: '2rem' }} />
        </IconButton>
        <Typography variant="h6" sx={{ color: '#3664AD', ml: 1 }}>Back</Typography>
      </Box>
      {vmDetails ? (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper sx={{ p: 3, borderRadius: '15px', backgroundColor: '#e83e8c', color: 'white' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <VirtualMachineIcon sx={{ fontSize: '2rem', mr: 1 }} />
                <Typography variant="h4" gutterBottom>{selectedVM.name} Summary</Typography>
              </Box>
            </Paper>
            <Paper sx={{ p: 3, borderRadius: '15px' }}>
              <TableContainer>
                <Table>
           
                  <TableBody>
                    <TableRow>
                      <TableCell>Status</TableCell>
                      <TableCell>{vmDetails.status}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Node</TableCell>
                      <TableCell>{selectedVM.node}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>CPU Usage</TableCell>
                      <TableCell>{(vmDetails.cpu * 100).toFixed(2)}%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Memory Usage</TableCell>
                      <TableCell>{((vmDetails.mem / vmDetails.maxmem) * 100).toFixed(2)}%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Disk Usage</TableCell>
                      <TableCell>{((vmDetails.disk / vmDetails.maxdisk) * 100).toFixed(2)}%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Max Disk</TableCell>
                      <TableCell>{vmDetails.maxdisk}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Max Memory</TableCell>
                      <TableCell>{vmDetails.maxmem}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Network In</TableCell>
                      <TableCell>{vmDetails.netin}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Network Out</TableCell>
                      <TableCell>{vmDetails.netout}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Uptime</TableCell>
                      <TableCell>{vmDetails.uptime}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>CPUs</TableCell>
                      <TableCell>{vmDetails.cpus}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Disk Read</TableCell>
                      <TableCell>{vmDetails.diskread}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Disk Write</TableCell>
                      <TableCell>{vmDetails.diskwrite}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <Box mt={2}>
                <Button variant="contained" sx={{ backgroundColor: '#3664AD', color: 'white', '&:hover': { backgroundColor: '#3664AD' }, mr: 2 }} onClick={() => setShowUpdateModal(true)}>
                  Update VM
                </Button>
                
                <Button variant="contained" sx={{ backgroundColor: '#e83e8c', color: 'white', '&:hover': { backgroundColor: '#e83e8c'} }} onClick={() => setShowDeleteModal(true)}>
                  Delete VM
                </Button>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, borderRadius: '15px' }}>
              <Typography variant="h6">CPU Usage</Typography>
              <Bar data={cpuUsageData} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, borderRadius: '15px' }}>
              <Typography variant="h6">Memory Usage</Typography>
              <Bar data={memoryUsageData} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, borderRadius: '15px' }}>
              <Typography variant="h6">Disk Usage</Typography>
              <Line data={diskUsageData} />
            </Paper>
          </Grid>
        </Grid>
      ) : (
        <Typography variant="body1">Select a VM to see details</Typography>
      )}

      {/* Update VM Modal */}
      <Modal open={showUpdateModal} onClose={() => setShowUpdateModal(false)}>
        <Box sx={{ p: 4, backgroundColor: 'white', borderRadius: '8px', width: '400px', margin: 'auto', mt: '10%' }}>
          <Typography variant="h6" mb={2}>Update VM</Typography>
          <TextField
            label="Cores"
            type="number"
            fullWidth
            margin="normal"
            value={updateData.cores}
            onChange={(e) => setUpdateData({ ...updateData, cores: e.target.value })}
          />
          <TextField
            label="Memory"
            type="number"
            fullWidth
            margin="normal"
            value={updateData.memory}
            onChange={(e) => setUpdateData({ ...updateData, memory: e.target.value })}
          />
          <Box mt={2}>
            <Button variant="contained" sx={{ backgroundColor: '#3664AD', color: 'white', '&:hover': { backgroundColor: '#2d538d' }, mr: 2 }} onClick={handleUpdateVM}>
              Update VM
            </Button>
            <Button variant="contained"  sx={{ backgroundColor: '#e83e8c', color: 'white', '&:hover': { backgroundColor: '#e83e8c' }, mr: 2 }} onClick={() => setShowUpdateModal(false)}>Cancel</Button>
          </Box>
        </Box>
      </Modal>

      {/* Delete VM Modal */}
      <Modal open={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <Box sx={{ p: 4, backgroundColor: 'white', borderRadius: '8px', width: '400px', margin: 'auto', mt: '10%' }}>
          <Typography variant="h6" mb={2}>Delete VM</Typography>
          <TextField
            label="Type the name of the VM to confirm deletion"
            fullWidth
            margin="normal"
            onChange={(e) => setDeleteConfirmation(e.target.value)}
          />
          <Box mt={2}>
            <Button variant="contained" sx={{ backgroundColor: '#e83e8c', color: 'white', '&:hover': { backgroundColor: '#e83e8c' }, mr: 2 }} onClick={handleDeleteVM}>
              Delete VM
            </Button>
            <Button variant="contained"  sx={{ backgroundColor: '#3664AD', color: 'white', '&:hover': { backgroundColor: '#3664AD' }, mr: 2 }}  onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default VMDetails;
