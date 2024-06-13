import axios from 'axios';

// const BASE_URL = 'http://192.168.1.14:5000';
// const BASE_URL = 'http://10.20.0.65:5000';
const BASE_URL = 'http://127.0.0.1:5000';

class UserTableService {
  async getUsers() {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BASE_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  async updateUserRole(userId, newRole) {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${BASE_URL}/users/${userId}/role`, { role: newRole }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating user role:', error);
      throw error;
    }
  }
}

export default new UserTableService();
