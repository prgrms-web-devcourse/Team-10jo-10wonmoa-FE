import { default as toast } from 'react-hot-toast';
import { fetchPostSignUp } from '@api/users';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';

const useSignUp = () => {
  const navigate = useNavigate();
  const { mutate } = useMutation(
    (signUpUser: SignUpUser) => fetchPostSignUp(signUpUser),
    {
      onSuccess: () => {
        toast.success('10원 모아 가계부에 가입하신걸 환영해요!');
        navigate('/login');
      },
    }
  );
  return mutate;
};

export default useSignUp;
