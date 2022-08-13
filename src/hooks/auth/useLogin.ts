import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { fetchPostLogin } from '@api/users';
import tokenStorage from '@utils/storage/TokenStorage';

const useLogin = () => {
  const navigate = useNavigate();

  const { mutate } = useMutation(
    (loginUser: LoginUser) => fetchPostLogin(loginUser),
    {
      onSuccess: (res) => {
        tokenStorage.setAccessToken(res.accessToken);
        tokenStorage.setRefreshToken(res.refreshToken);
        navigate('/account-book/daily');
      },
    }
  );
  return mutate;
};

export default useLogin;
