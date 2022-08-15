import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { CoinIcon } from '@components';
import { Title, SubTitle } from '@components/auth';
import { fetchGetUser } from '@api/users';
import { useQuery } from 'react-query';

const Logo = () => {
  const navigate = useNavigate();

  useQuery(
    'get-user',
    async () => {
      const response = await fetchGetUser();
      return response.data;
    },
    {
      onSuccess: () => {
        setTimeout(() => {
          navigate('/account-book/daily');
        }, 1500);
      },
      onError: () => {
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      },
    }
  );

  return (
    <Container className="fadeIn">
      <div className="bounce">
        <CoinIcon />
      </div>
      <TitleContainer>
        <Title text="10원모아" />
        <SubTitle text="편리하게 돈을 관리해보세요." />
      </TitleContainer>
    </Container>
  );
};

export default Logo;

const Container = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const TitleContainer = styled.div`
  margin-top: 3rem;
`;
