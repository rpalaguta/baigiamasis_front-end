import axios from 'axios';

axios.defaults.baseURL = 'http://localhost/api';

//vyksta pries requesta
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const setAuthToken = (token) => {
  console.log({ token });
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const clearAuthToken = () => {
  delete axios.defaults.headers.common['Authorization'];
};

export default axios;
