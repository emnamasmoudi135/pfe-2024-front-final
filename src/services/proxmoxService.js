import axios from 'axios';

// const API_BASE_URL = 'http://192.168.1.14:5000';
// const API_BASE_URL = 'http://10.20.0.65:5000';
const API_BASE_URL = 'http://127.0.0.1:5000';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    Authorization: `Bearer ${token}`,
  };
};

const loginProxmox = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/login-proxmox`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    return null;
  }
};

const listVMs = async (node) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/list-vms/${node}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Listing VMs failed:', error);
    return null;
  }
};

const createVM = async (node, vmConfig) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/create-vm/${node}`, vmConfig, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Creating VM failed:', error);
    return null;
  }
};

const destroyVM = async (node, vmid) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/destroy-vm/${node}/${vmid}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Deleting VM failed:', error);
    return null;
  }
};

const updateVM = async (node, vmid, vmConfig) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/update-vm/${node}/${vmid}`, vmConfig, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Updating VM failed:', error);
    return null;
  }
};

const getVMStatus = async (node, vmid) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/vm-status/${node}/${vmid}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Getting VM status failed:', error);
    return null;
  }
};

const startVM = async (node, vmid) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/vms/${node}/${vmid}/start`, {}, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Starting VM failed:', error);
    return null;
  }
};

const stopVM = async (node, vmid) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/vms/${node}/${vmid}/stop`, {}, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Stopping VM failed:', error);
    return null;
  }
};

const getNodeStatistics = async (node) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/proxmox/nodes/${node}/statistics`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Fetching node statistics failed:', error);
    return null;
  }
};

export default {
  loginProxmox,
  listVMs,
  createVM,
  destroyVM,
  updateVM,
  getVMStatus,
  startVM,
  stopVM,
  getNodeStatistics,
};
