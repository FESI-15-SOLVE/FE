import axios from 'axios';
import { CLIENT_API_URL } from '@/constants/api';

export const clientApi = axios.create({
  baseURL: `${CLIENT_API_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
});
