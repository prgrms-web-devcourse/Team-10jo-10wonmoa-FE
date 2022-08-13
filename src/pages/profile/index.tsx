import React from 'react';
import styled from '@emotion/styled';
import { BottomNavigation, TopNavBar, CoinIcon, Button } from '@components';
import { fetchDeleteUser, fetchPostLogout, fetchGetUser } from '@api/users';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import tokenStorage from '@utils/storage/TokenStorage';

const Profile = () => {
  const navigate = useNavigate();
  const { data } = useQuery('user', async () => {
    const response = await fetchGetUser();
    return response.data;
  });

  const { mutate: mutateLogout } = useMutation(
    'logout',
    async () => {
      const response = await fetchPostLogout();
      return response.data;
    },
    {
      onSuccess: () => {
        tokenStorage.clearTokens();
        navigate('/');
      },
    }
  );

  const { mutate: mutateWithdraw } = useMutation(
    'withdraw',
    async () => {
      const response = await fetchDeleteUser();
      return response.data;
    },
    {
      onSuccess: () => {
        tokenStorage.clearTokens();
      },
    }
  );

  return (
    <>
      <TopNavBar />
      <CoinIcon />
      <Container>
        <h4>{data?.email}님</h4>
        <Button sizeType="large" onClick={() => mutateLogout()}>
          로그아웃
        </Button>
        <Button sizeType="large" onClick={() => mutateWithdraw()}>
          회원탈퇴
        </Button>
      </Container>
      <BottomNavigation />
    </>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  button {
    margin-top: 3rem;
  }
  h4 {
    margin-top: 1rem;
  }
`;
export default Profile;
