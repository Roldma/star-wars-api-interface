import axios from 'axios';

const config = {
  baseURL: 'http://localhost:6868/',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  timeout: 100000,
};

const instance = axios.create(config);

export default instance;
