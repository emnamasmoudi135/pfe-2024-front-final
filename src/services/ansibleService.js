import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:5000';

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
}


export default new AnsibleService();
