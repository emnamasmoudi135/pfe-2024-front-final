import React, { useEffect, useState } from 'react';
import proxmoxService from 'src/services/proxmoxService';
import VMCard from 'src/components/VMCard';
import VMDetails from 'src/components/VMDetails';
import Dashboard from './Dashboard';
import { Container, Grid, Button, Modal, TextField, Box, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Proxmox = () => {
  const [vms, setVms] = useState([]);
  const [filteredVMs, setFilteredVMs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVM, setSelectedVM] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [createData, setCreateData] = useState({
    node: 'proxmox-server',
    vmid: '',
    name: '',
    ide2: 'local:iso/xubuntu-23.10-minimal-amd64__1_.iso,media=cdrom',
    cores: 1,
    memory: 2048,
    net0: 'virtio,bridge=vmbr0,firewall=1',
    ostype: 'l26',
    scsi0: 'local-lvm:32',
    sockets: 1,
    scsihw: 'virtio-scsi-pci'
  });
  const [nodeStatistics, setNodeStatistics] = useState(null);
  const node = 'proxmox-server';

  const fetchVMs = async () => {
    const response = await proxmoxService.listVMs(node);
    if (response && response[0] === true && Array.isArray(response[1])) {
      const vmsWithNode = response[1].map(vm => ({ ...vm, node }));
      setVms(vmsWithNode);
      setFilteredVMs(vmsWithNode);
    } else {
      console.error('Failed to fetch VMs');
    }
  };

  const fetchNodeStatistics = async () => {
    const response = await proxmoxService.getNodeStatistics(node);
    if (response) {
      setNodeStatistics(response);
    } else {
      alert('Failed to fetch node statistics');
    }
  };

  useEffect(() => {
    fetchVMs();
    fetchNodeStatistics();
  }, [node]);

  useEffect(() => {
    setFilteredVMs(
      vms.filter(vm => vm.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery, vms]);

  const handleSelectVM = (vm) => {
    setSelectedVM(vm);
  };

  const handleStartVM = async (vm) => {
    const response = await proxmoxService.startVM(vm.node, vm.vmid);
    if (response && response[0] === true) {
      toast.success(`VM ${vm.name} started successfully!`);
      fetchVMs();
    } else {
      toast.success(`VM ${vm.name} started successfully!`);
    }
  };

  const handleStopVM = async (vm) => {
    const response = await proxmoxService.stopVM(vm.node, vm.vmid);
    if (response && response[0] === true) {
      toast.success(`VM ${vm.name} stopped successfully!`);
      fetchVMs();
    } else {
      toast.success(`VM ${vm.name} stopped successfully!`);
    }
  };

  const handleCreateVM = async () => {
    const response = await proxmoxService.createVM('proxmox-server', createData);
    if (response && response[0] === true) {
      setShowCreateModal(false);
      toast.success('VM created successfully!');
      fetchVMs();
    } else {
      console.error('Failed to create VM');
      toast.error('Failed to create VM');
    }
  };

  const generateChartData = () => {
    if (!nodeStatistics) return {};

    return {
      cpuUsage: {
        labels: ['CPU Usage'],
        datasets: [
          {
            label: 'CPU Usage',
            data: [nodeStatistics.cpu * 100],
            backgroundColor: '#d95ca9',
            borderColor: '#d95ca9',
            borderWidth: 1,
          },
        ],
      },
      memoryUsage: {
        labels: ['Used', 'Free'],
        datasets: [
          {
            label: 'Memory Usage',
            data: [nodeStatistics.memory.used, nodeStatistics.memory.free],
            backgroundColor: ['#d95ca9', '#3664AD'],
            borderColor: ['#d95ca9', '#3664AD'],
            borderWidth: 1,
          },
        ],
      },
      swapUsage: {
        labels: ['Used', 'Free'],
        datasets: [
          {
            label: 'Swap Usage',
            data: [nodeStatistics.swap.used, nodeStatistics.swap.free],
            backgroundColor: ['#d95ca9', '#3664AD'],
            borderColor: ['#d95ca9', '#3664AD'],
            borderWidth: 1,
          },
        ],
      },
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };

  return (
    <Container>
      {!selectedVM && (
        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Search VM"
              variant="outlined"
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#d95ca9', color: 'white', '&:hover': { backgroundColor: '#d95ca9' }, mr: 2 }}
              onClick={() => setShowCreateModal(true)}
            >
              Create VM
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#3664AD', color: 'white', '&:hover': { backgroundColor: '#3664AD' } }}
              onClick={() => setShowDashboard(!showDashboard)} // Toggle dashboard
            >
              {showDashboard ? 'Hide Dashboard' : 'View Dashboard'}
            </Button>
          </Grid>
        </Grid>
      )}
      {selectedVM ? (
        <VMDetails selectedVM={selectedVM} refreshVMs={fetchVMs} onBack={() => setSelectedVM(null)} />
      ) : (
        <>
          {showDashboard ? (
            <Dashboard nodeStatistics={nodeStatistics} chartOptions={chartOptions} generateChartData={generateChartData} />
          ) : (
            <Grid container spacing={2} mt={2}>
              {filteredVMs.map(vm => (
                <Grid item xs={12} sm={6} md={4} key={vm.vmid}>
                  <VMCard 
                    vm={vm} 
                    onSelectVM={handleSelectVM} 
                    onStartVM={handleStartVM} 
                    onStopVM={handleStopVM} 
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}
      <ToastContainer />
         {/* Create VM Modal */}
      <Modal open={showCreateModal} onClose={() => setShowCreateModal(false)}>
        <Box sx={{ p: 4, backgroundColor: 'white', borderRadius: '8px', width: '400px', margin: 'auto', mt: '10%' }}>
          <Typography variant="h6" mb={2}>Create VM</Typography>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            onChange={(e) => setCreateData({ ...createData, name: e.target.value })}
          />
          <TextField
            label="VM ID"
            type="number"
            fullWidth
            margin="normal"
            onChange={(e) => setCreateData({ ...createData, vmid: e.target.value })}
          />
          <TextField
            label="Cores"
            type="number"
            fullWidth
            margin="normal"
            value={createData.cores}
            onChange={(e) => setCreateData({ ...createData, cores: e.target.value })}
          />
          <TextField
            label="Memory"
            type="number"
            fullWidth
            margin="normal"
            value={createData.memory}
            onChange={(e) => setCreateData({ ...createData, memory: e.target.value })}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>OS Type</InputLabel>
            <Select
              value={createData.ostype}
              onChange={(e) => setCreateData({ ...createData, ostype: e.target.value })}
            >
              <MenuItem value="win11">Windows 11</MenuItem>
              <MenuItem value="l26">Linux (L26)</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>IDE2</InputLabel>
            <Select
              value={createData.ide2}
              onChange={(e) => setCreateData({ ...createData, ide2: e.target.value })}
            >
              <MenuItem value="local:iso/Win11_23H2_English_x64v2.iso,media=cdrom">Win11_23H2_English_x64v2.iso</MenuItem>
              <MenuItem value="local:iso/xubuntu-23.10-minimal-amd64__1_.iso,media=cdrom">xubuntu-23.10-minimal-amd64__1_.iso</MenuItem>
            </Select>
          </FormControl>
          <Box mt={2}>
            <Button variant="contained" sx={{ backgroundColor: '#d95ca9', color: 'white', '&:hover': { backgroundColor: '#d95ca9' }, mr: 2 }} onClick={handleCreateVM}>Create VM</Button>
            <Button variant="contained" sx={{ backgroundColor: '#3664AD', color: 'white', '&:hover': { backgroundColor: '#3664AD' }, mr: 2 }} onClick={() => setShowCreateModal(false)}>Cancel</Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default Proxmox;
