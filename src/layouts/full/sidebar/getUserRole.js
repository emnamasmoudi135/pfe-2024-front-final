import {jwtDecode} from 'jwt-decode';

const getUserRole = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  }

  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.sub.role;
  } catch (e) {
    console.error('Error decoding token:', e);
    return null;
  }
};

export default getUserRole;
