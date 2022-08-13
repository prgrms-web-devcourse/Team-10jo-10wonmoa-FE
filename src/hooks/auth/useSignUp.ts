import { AxiosError } from 'axios';
import { fetchPostSignUp } from '@api/users';
import { useNavigate } from 'react-router-dom';
import type { NewUser } from '@types';
import { useMutation } from 'react-query';

const useSignUp = () => {
  const navigate = useNavigate();
  const { mutate } = useMutation(
    (newUser: NewUser) => fetchPostSignUp(newUser),
    {
      onSuccess: () => {
        alert('10원 모아 가계부에 가입하신걸 환영해요! 📝💰');
        navigate('/login');
      },
      onError: (error) => {
        const message =
          error instanceof AxiosError
            ? error.response?.data.messages
            : '네트워크 서버에 잠시 문제가 있는 것 같아요. 잠시 후 다시 시도해주세요 🙏';
        alert(message);
      },
    }
  );
  return mutate;
};

export default useSignUp;
