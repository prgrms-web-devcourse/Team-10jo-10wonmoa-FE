import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 404 || error.response.status === 400) {
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default instance;
