import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:5000/terraform';

const terraformService = {
  getConfig: async () => {
    const response = await axios.get(`${BASE_URL}/config`);
    return response.data;
  },
  updateConfig: async (content) => {
    const response = await axios.post(`${BASE_URL}/config`, { content });
    return response.data;
  },
  init: async () => {
    const response = await axios.get(`${BASE_URL}/init`);
    return response.data;
  },
  apply: async () => {
    const response = await axios.post(`${BASE_URL}/apply`);
    return response.data;
  },
  destroy: async () => {
    const response = await axios.post(`${BASE_URL}/destroy`);
    return response.data;
  }
};

export default terraformService;
