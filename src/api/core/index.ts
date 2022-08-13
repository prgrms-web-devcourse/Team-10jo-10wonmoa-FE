import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import tokenStorage from '@utils/storage/TokenStorage';
import { fetchAccessToken } from '@api/auth';

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

const Instance = (
  baseURL = process.env.REACT_APP_API_URL,
  options?: AxiosRequestConfig
) => {
  const instance = axios.create({
    baseURL,
    timeout: 5000,
    ...options,
  });
  return instance;
};

type Request = () => AxiosInstance;

export const request: Request = () => {
  return Instance();
};

export const authRequest: Request = () => {
  const instance = Instance();

  instance.interceptors.request.use((config) => {
    return {
      ...config,
      headers: {
        Authorization: `Bearer ${tokenStorage.getAccessToken()}`,
      },
    };
  });

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const {
        config,
        response: { status, data },
      } = error;

      const isExpiredAccessToken =
        status === 401 && data.messages[0] === '만료된 access-token 입니다.';

      if (isExpiredAccessToken) {
        const data = await fetchAccessToken();
        tokenStorage.setAccessToken(data.accessToken);
        tokenStorage.setRefreshToken(data.refreshToken);
        return axios(config);
      }

      return Promise.reject(error);
    }
  );

  return instance;
};
