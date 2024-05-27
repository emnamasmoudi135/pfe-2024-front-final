import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:5000';
const PROXMOX_BASE_URL = BASE_URL;

class AnsibleService {
  async listPlaybooks() {
    try {
      const response = await axios.get(`${BASE_URL}/list-playbooks`);
      return response.data;
    } catch (error) {
      console.error('Error listing playbooks:', error);
      throw error;
    }
  }

  async getPlaybookDetail(playbookName) {
    try {
      const response = await axios.get(`${BASE_URL}/playbook-detail/${playbookName}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching details of playbook ${playbookName}:`, error);
      throw error;
    }
  }

  async createPlaybook(playbookName, content) {
    try {
      const response = await axios.post(`${BASE_URL}/add-playbook/${playbookName}`, { new_content: content });
      return response.data;
    } catch (error) {
      console.error(`Error creating playbook ${playbookName}:`, error);
      throw error;
    }
  }

  async updatePlaybook(playbookName, content) {
    try {
      const response = await axios.put(`${BASE_URL}/modify-playbook/${playbookName}`, { new_content: content });
      return response.data;
    } catch (error) {
      console.error(`Error updating playbook ${playbookName}:`, error);
      throw error;
    }
  }

  async deletePlaybook(playbookName) {
    try {
      const response = await axios.delete(`${BASE_URL}/delete-playbook/${playbookName}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting playbook ${playbookName}:`, error);
      throw error;
    }
  }

  async loginProxmox() {
    try {
      const response = await axios.get(`${PROXMOX_BASE_URL}/login-proxmox`);
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
        const response = await axios.get(`${PROXMOX_BASE_URL}/list-vms/${node}`);
        return response.data[1];
      }
      return [];
    } catch (error) {
      console.error('Error fetching VMs:', error);
      return [];
    }
  }
}

export default new AnsibleService();
