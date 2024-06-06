
import { jwtDecode } from 'jwt-decode';

export const getUserRole = () => {
  const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token='));
  if (!token) return null;

  const decodedToken = jwtDecode(token.split('=')[1]);
  return decodedToken.role;
};
