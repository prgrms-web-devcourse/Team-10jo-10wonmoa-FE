import React from 'react';
import styled from '@emotion/styled';
import { theme } from '@styles';

interface TabItem {
  value: string;
  title: string;
  color?: string;
}

interface TabsProps {
  tabItems: TabItem[];
}

const TabsDisplayAccountSum: React.FC<TabsProps> = ({ tabItems }) => {
  return (
    <TabListContainer>
      {tabItems.map((item) => (
        <Tab key={item.title}>
          <P>{item.title}</P>
          <P color={item.color}>{item.value}</P>
        </Tab>
      ))}
    </TabListContainer>
  );
};

export default TabsDisplayAccountSum;

const P = styled.p(
  {
    fontSize: '1rem',
  },
  (props) => ({ color: props.color })
);

const TabListContainer = styled.div`
  width: 100%;
  height: 5rem;
  display: flex;
`;

const Tab = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${theme.$gray_dark};
  background-color: ${theme.$white};
`;
