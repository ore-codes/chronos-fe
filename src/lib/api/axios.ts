import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost',
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const getCSRFToken = async () => {
  await api.get('/sanctum/csrf-cookie');
};

export default api;
