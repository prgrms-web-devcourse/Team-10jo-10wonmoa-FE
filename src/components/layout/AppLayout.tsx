import React from 'react';
import styled from '@emotion/styled';
import { theme } from '@styles';

interface AppLayoutInterface {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutInterface> = ({ children }) => {
  return <Layout>{children}</Layout>;
};

export default AppLayout;

const Layout = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  overflow-y: hidden;
  width: 30rem;
  height: 100vh;
  box-shadow: 0 0 2rem 0.1rem rgba(0, 0, 0, 0.3);
  background-color: ${theme.$white};
  margin: 0 auto;
  -ms-overflow-style: none;

  @media screen and (max-width: 40rem) {
    width: 100%;
  }
`;
