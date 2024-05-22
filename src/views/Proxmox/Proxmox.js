import React, { useEffect, useState } from 'react';
import proxmoxService from 'src/services/proxmoxService';
import VMCard from 'src/components/VMCard';
import VMDetails from 'src/components/VMDetails';
import { Container, Grid, Button, Modal, TextField, Box, Typography, IconButton } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Proxmox = () => {
  const [vms, setVms] = useState([]);
  const [filteredVMs, setFilteredVMs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVM, setSelectedVM] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
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
  const node = 'proxmox-server'; // Update with the actual node name

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

  useEffect(() => {
    fetchVMs();
  }, [node]);

  useEffect(() => {
    setFilteredVMs(
      vms.filter(vm => vm.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery, vms]);

  const handleSelectVM = (vm) => {
    setSelectedVM(vm);
  };

  const handleCreateVM = async () => {
    const response = await proxmoxService.createVM('proxmox-server', createData);
    if (response && response[0] === true) {
      setShowCreateModal(false);
      toast.success('VM created successfully!');
      fetchVMs(); // Refresh the VM list
    } else {
      console.error('Failed to create VM');
      toast.error('Failed to create VM');
    }
  };

  return (
    <Container>
      <Grid container spacing={2} alignItems="center" justifyContent="space-between">
        <Grid item xs={12} sm={8} md={9}>
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
            sx={{ backgroundColor: '#e83e8c', color: 'white', '&:hover': { backgroundColor: '#5ba914' } }}
            onClick={() => setShowCreateModal(true)}
          >
            Create VM
          </Button>
        </Grid>
      </Grid>
      {selectedVM ? (
        <VMDetails selectedVM={selectedVM} refreshVMs={fetchVMs} onBack={() => setSelectedVM(null)} />
      ) : (
        <Grid container spacing={2} mt={2} justifyContent="center">
          {filteredVMs.map(vm => (
            <Grid item xs={12} sm={6} md={4} key={vm.vmid}>
              <VMCard vm={vm} onSelectVM={handleSelectVM} />
            </Grid>
          ))}
        </Grid>
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
          <Box mt={2}>
            <Button variant="contained" color="primary" onClick={handleCreateVM} sx={{ mr: 2 }}>Create VM</Button>
            <Button variant="contained" onClick={() => setShowCreateModal(false)}>Cancel</Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default Proxmox;
