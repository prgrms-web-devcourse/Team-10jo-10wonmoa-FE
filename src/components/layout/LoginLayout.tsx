import React from 'react';
import styled from '@emotion/styled';

import { TopNavBar, CoinIcon, SubTitle } from '@components';

interface LoginLayoutProps {
  children: React.ReactNode;
  isActiveGoBack?: boolean;
  title?: string;
}

const LoginLayout: React.FC<LoginLayoutProps> = (props) => {
  return (
    <Wrapper>
      <TopNavBar isActiveGoBack={props.isActiveGoBack} />
      <CoinIcon />
      <SubTitle>{props.title}</SubTitle>
      {props.children}
    </Wrapper>
  );
};

export default LoginLayout;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
