import axios from 'axios';
import { getToken, removeToken } from '../services/token.service';

const privateApi = axios.create({
  baseURL: 'https://cashapp.devocra.com/v1/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token
privateApi.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle unauthorized
privateApi.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      await removeToken();
      // optional: force logout
    }
    return Promise.reject(error);
  }
);

export default privateApi;
