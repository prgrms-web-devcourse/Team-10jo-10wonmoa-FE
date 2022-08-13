import React from 'react';
import styled from '@emotion/styled';
import { theme } from '@styles';

interface AppLayoutInterface {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutInterface> = ({ children }) => {
  return <Layout className="app_layout">{children}</Layout>;
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
  max-width: 768px;
  min-width: 320px;
  padding: 0.5rem 1rem;
  height: 100vh;
  background-color: ${theme.$white};
  margin: 0 auto;
  -ms-overflow-style: none;

  @media screen and (max-width: 576px) {
    width: 100%;
  }
`;
