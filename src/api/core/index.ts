import axios, { AxiosInstance } from 'axios';
import tokenStorage from '@utils/storage/TokenStorage';

const getJWTHeader = (): Record<string, string> => {
  const token = tokenStorage.getAccessToken();

  return token
    ? { Authorization: `Bearer ${tokenStorage.getAccessToken()}` }
    : {};
};

const setInterceptors = (instance: AxiosInstance, isAuthRequire?: boolean) => {
  instance.interceptors.request.use((config) => {
    if (!isAuthRequire) return config;

    return {
      ...config,
      headers: {
        ...getJWTHeader(),
      },
    };
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

  return instance;
};

const createInstance = (isAuthRequire: boolean) => {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });
  return setInterceptors(instance, isAuthRequire);
};

export const axiosInstance = createInstance(false);
export const axiosAuthInstance = createInstance(true);
