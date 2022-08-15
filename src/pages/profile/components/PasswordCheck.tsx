import React, { useState } from 'react';
import { Button, Input } from '@components';
import { AuthFormWrapper } from '@components/auth';
import { useForm } from '@hooks';
import { useMutation } from 'react-query';
import { fetchPostPasswordCheck, fetchDeleteUser } from '@api/users';
import { useNavigate } from 'react-router-dom';
import { default as toast } from 'react-hot-toast';

type PasswordCheck = {
  password: string;
};

const PasswordCheck = () => {
  const navigate = useNavigate();
  const { formValues, handleChange } = useForm<PasswordCheck>({
    password: '',
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const [isWithdrawDisabled, setIsWithdrawDisabled] = useState(true);

  const { mutate: mutatePasswordCheck } = useMutation(
    'password-check',
    async (password: string) => {
      const response = await fetchPostPasswordCheck(password);
      return response.data;
    },
    {
      onSuccess: () => {
        setIsWithdrawDisabled(false);
      },
      onError: () => {
        setIsWithdrawDisabled(true);
      },
    }
  );

  const { mutate: mutateWidthDraw } = useMutation(
    'withdraw',
    async () => {
      const response = await fetchDeleteUser();
      return response.data;
    },
    {
      onSuccess: () => {
        toast.success('회원탈퇴 되었습니다');
        navigate('/');
      },
    }
  );

  const handleWidthDraw = async () => {
    mutatePasswordCheck(formValues.password);
    mutateWidthDraw();
  };

  return (
    <AuthFormWrapper onSubmit={onSubmit}>
      <p>탈퇴를 원하시면 비밀번호를 입력해주세요</p>
      <br />
      <Input
        type="password"
        name="password"
        onChange={handleChange}
        placeholder="비밀번호"
        required={true}
      />
      <Button
        sizeType="large"
        type="submit"
        onClick={() => mutatePasswordCheck(formValues.password)}
      >
        비밀번호 확인
      </Button>
      <Button
        sizeType="large"
        isDisabled={isWithdrawDisabled}
        onClick={handleWidthDraw}
      >
        회원탈퇴
      </Button>
    </AuthFormWrapper>
  );
};

export default PasswordCheck;
