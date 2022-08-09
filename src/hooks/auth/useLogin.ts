import { AxiosResponse, AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import type { LoginUser, Token } from '@types';
import axiosInstance from '@api/core';
import tokenStorage from '@utils/storage/TokenStorage';

const fetchLogIn = async (loginUser: LoginUser): Promise<Token> => {
  const { data }: AxiosResponse<Token> = await axiosInstance.post(
    '/users/login',
    loginUser
  );
  return data;
};

const useLogin = () => {
  const navigate = useNavigate();

  const { mutate } = useMutation(
    (loginUser: LoginUser) => fetchLogIn(loginUser),
    {
      onSuccess: (res) => {
        tokenStorage.setAccessToken(res.accessToken);
        tokenStorage.setRefreshToken(res.refreshToken);
        navigate('/account-book/daily');
      },
      onError: (error: AxiosError) => {
        const message =
          error instanceof AxiosError
            ? error.response?.data.messages
            : '네트워크 서버에 잠시 문제가 있는 것 같아요. 잠시 후 다시 시도해주세요! 🙏';

        alert(message);
      },
    }
  );
  return mutate;
};

export default useLogin;
