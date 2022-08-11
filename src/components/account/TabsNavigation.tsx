import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';

type TabItem = {
  path: string;
  title: string;
};

const TabsNavigation = <T extends { tabItems: TabItem[] }>(props: T) => {
  return (
    <TabListContainer>
      {props.tabItems.map((item) => (
        <TabNav
          key={item.path}
          to={item.path}
          className={(item) => (item.isActive ? 'active' : '')}
        >
          {item.title}
        </TabNav>
      ))}
    </TabListContainer>
  );
};

export default TabsNavigation;

const TabListContainer = styled.div`
  width: 100%;
  display: flex;
`;

const TabNav = styled(NavLink)`
  text-align: center;
  padding: 0.7rem 0;
  flex-grow: 1;
  font-size: 1.2rem;
  font-weight: 500;
  cursor: pointer;
  color: ${(props) => props.theme.$gray_dark};
  background-color: ${(props) => props.theme.$white};
  &.active {
    font-weight: bold;
    border-bottom: 3px solid ${(props) => props.theme.$primary};
    color: ${(props) => props.theme.$primary};
  }
`;
