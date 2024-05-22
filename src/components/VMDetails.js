import React, { useState, useEffect } from 'react';
import proxmoxService from 'src/services/proxmoxService';
import { Container, Typography, Button, Grid, Modal, TextField, Box, Paper } from '@mui/material';
import { Line, Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { toast } from 'react-toastify';
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
  Legend
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
                data: [details.cpu * 100], // Convert to percentage
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.6)',
                fill: true,
              }
            ]
          });
          setMemoryUsageData({
            labels,
            datasets: [
              {
                label: 'Memory Usage',
                data: [(details.mem / details.maxmem) * 100], // Convert to percentage
                borderColor: 'rgba(153,102,255,1)',
                backgroundColor: 'rgba(153,102,255,0.6)',
                fill: true,
              }
            ]
          });
          setDiskUsageData({
            labels,
            datasets: [
              {
                label: 'Disk Usage',
                data: [(details.disk / details.maxdisk) * 100], // Convert to percentage
                borderColor: 'rgba(255,159,64,1)',
                backgroundColor: 'rgba(255,159,64,0.6)',
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
      <Button variant="contained" onClick={onBack} sx={{ mb: 2 }}>
        Back
      </Button>
      {vmDetails ? (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper sx={{ p: 3, borderRadius: '15px' }}>
              <Typography variant="h4" gutterBottom>{selectedVM.name} Summary</Typography>
              <Typography variant="body1">
                <strong>Status:</strong> {vmDetails.status}
              </Typography>
              <Typography variant="body1">
                <strong>Node:</strong> {selectedVM.node}
              </Typography>
              <Typography variant="body1">
                <strong>CPU Usage:</strong> {(vmDetails.cpu * 100).toFixed(2)}%
              </Typography>
              <Typography variant="body1">
                <strong>Memory Usage:</strong> {((vmDetails.mem / vmDetails.maxmem) * 100).toFixed(2)}%
              </Typography>
              <Typography variant="body1">
                <strong>Disk Usage:</strong> {((vmDetails.disk / vmDetails.maxdisk) * 100).toFixed(2)}%
              </Typography>
              <Box mt={2}>
                <Button variant="contained" onClick={() => setShowUpdateModal(true)} sx={{ mr: 2 }}>
                  Update VM
                </Button>
                <Button variant="contained" color="error" onClick={() => setShowDeleteModal(true)}>
                  Delete VM
                </Button>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, borderRadius: '15px' }}>
              <Typography variant="h6">CPU Usage</Typography>
              <Line data={cpuUsageData} />
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
              <Pie data={diskUsageData} />
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
            <Button variant="contained" color="primary" onClick={handleUpdateVM} sx={{ mr: 2 }}>Update VM</Button>
            <Button variant="contained" onClick={() => setShowUpdateModal(false)}>Cancel</Button>
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
            <Button variant="contained" color="error" onClick={handleDeleteVM} sx={{ mr: 2 }}>Delete VM</Button>
            <Button variant="contained" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default VMDetails;
