import axios from 'axios';

const publicApi = axios.create({
  baseURL: 'https://cashapp.devocra.com/v1/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default publicApi;