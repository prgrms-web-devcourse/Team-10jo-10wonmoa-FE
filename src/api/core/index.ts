import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Authorization: '',
  },
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // TODO: QueryClient를 통해 실제 에러 핸들링 처리
    if (error.response.status === 404 || error.response.status === 400) {
      // window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default instance;
