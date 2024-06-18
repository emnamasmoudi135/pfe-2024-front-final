import axios from 'axios';
// 192.168.1.14
// const BASE_URL = 'http://10.20.0.65:5000';  
const BASE_URL = 'http://127.0.0.1:5000';  
const PROXMOX_BASE_URL = BASE_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    Authorization: `Bearer ${token}`,
  };
};

class AnsibleService {
  async listPlaybooks() {
    try {
      const response = await axios.get(`${BASE_URL}/list-playbooks`, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error('Error listing playbooks:', error);
      throw error;
    }
  }

  async getPlaybookDetail(playbookName) {
    try {
      const response = await axios.get(`${BASE_URL}/playbook-detail/${playbookName}`, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching details of playbook ${playbookName}:`, error);
      throw error;
    }
  }

  async createPlaybook(playbookName, content) {
    try {
      const response = await axios.post(`${BASE_URL}/add-playbook/${playbookName}`, { new_content: content }, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error(`Error creating playbook ${playbookName}:`, error);
      throw error;
    }
  }

  async updatePlaybook(playbookName, content) {
    try {
      const response = await axios.put(`${BASE_URL}/modify-playbook/${playbookName}`, { new_content: content }, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating playbook ${playbookName}:`, error);
      throw error;
    }
  }

  async deletePlaybook(playbookName) {
    try {
      const response = await axios.delete(`${BASE_URL}/delete-playbook/${playbookName}`, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error(`Error deleting playbook ${playbookName}:`, error);
      throw error;
    }
  }

  async loginProxmox() {
    try {
      const response = await axios.get(`${PROXMOX_BASE_URL}/login-proxmox`, {
        headers: getAuthHeaders(),
      });
      const { CSRFPreventionToken, ticket } = response.data[1];
      axios.defaults.headers.common['CSRFPreventionToken'] = CSRFPreventionToken;
      axios.defaults.headers.common['Authorization'] = `PVEAuthCookie=${ticket}`;
      return true;
    } catch (error) {
      console.error('Error logging in to Proxmox:', error);
      return false;
    }
  }

  async listVMs(node) {
    try {
      const loginSuccess = await this.loginProxmox();
      if (loginSuccess) {
        const response = await axios.get(`${PROXMOX_BASE_URL}/list-vms/${node}`, {
          headers: getAuthHeaders(),
        });
        return response.data[1];
      }
      return [];
    } catch (error) {
      console.error('Error fetching VMs:', error);
      return [];
    }
  }

  async executePlaybook(playbookName) {
    try {
      const response = await axios.post(`${BASE_URL}/execute-playbook/${playbookName}`, {}, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error(`Error executing playbook ${playbookName}:`, error);
      throw error;
    }
  }

  async modifyEnv(newContent) {
    try {
      const response = await axios.put(`${BASE_URL}/env`, newContent, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error('Error modifying .env file:', error);
      throw error;
    }
  }

  async modifyHosts(newContent) {
    try {
      const response = await axios.post(`${BASE_URL}/modify-hosts`, { new_content: newContent }, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error('Error modifying hosts file:', error);
      throw error;
    }
  }

  async getEnv() {
    try {
      const response = await axios.get(`${BASE_URL}/env`, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching environment variables:', error);
      throw error;
    }
  }

  async getHostsContent() {
    try {
      const headers = getAuthHeaders();
      console.log('Request headers:', headers);  // Add this line to debug
      const response = await axios.get(`${BASE_URL}/get-hosts-content`, {
        headers: headers,
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching hosts content:', error);
      throw error;
    }
  }
  

}

export default new AnsibleService();
