import axios, { AxiosInstance } from 'axios';

const createApiClient = (baseURL: string): AxiosInstance => {
  const api = axios.create({
    baseURL: baseURL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return api;
};

export default createApiClient;