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
    (error) => Promise.reject(error)
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
