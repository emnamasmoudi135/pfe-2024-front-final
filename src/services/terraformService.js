

// const BASE_URL = 'http://192.168.1.14:5000/terraform';
// const BASE_URL = 'http://10.20.0.65:5000/terraform';
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:5000/terraform';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    Authorization: `Bearer ${token}`,
  };
};

const terraformService = {
  getConfig: async () => {
    const response = await axios.get(`${BASE_URL}/config`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  },
  updateConfig: async (content) => {
    const response = await axios.post(`${BASE_URL}/config`, { content }, {
      headers: getAuthHeaders(),
    });
    return response.data;
  },
  init: async () => {
    const response = await axios.get(`${BASE_URL}/init`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  },
  apply: async () => {
    const response = await axios.post(`${BASE_URL}/apply`, {}, {
      headers: getAuthHeaders(),
    });
    return response.data;
  },
  destroy: async () => {
    const response = await axios.post(`${BASE_URL}/destroy`, {}, {
      headers: getAuthHeaders(),
    });
    return response.data;
  }
};

export default terraformService;
