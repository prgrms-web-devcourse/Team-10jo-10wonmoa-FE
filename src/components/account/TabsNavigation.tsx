import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';
import { theme } from '@styles';

type TabItem = {
  path: string;
  title: string;
};

interface TabsProps {
  tabItems: TabItem[];
}

const TabsNavigation: React.FC<TabsProps> = (props) => {
  return (
    <TabListContainer>
      {props.tabItems.map((item) => (
        <TabNav
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
  height: 3rem;
  display: flex;
`;

const TabNav = styled(NavLink)`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-bottom: 1px solid ${theme.$gray_dark};
  color: ${theme.$gray_dark};
  background-color: ${theme.$white};

  &.active {
    background-color: ${theme.$secondary};
    border-bottom: 1px solid ${theme.$primary};
    color: ${theme.$primary};
  }
`;
