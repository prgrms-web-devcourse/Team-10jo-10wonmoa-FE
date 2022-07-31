import React from 'react';
import styled from '@emotion/styled';
import { theme } from '@styles';

interface TabItem {
  value: string;
  title: string;
}

interface TabsProps {
  tabItems: TabItem[];
}

const TabsDisplayAccountSum: React.FC<TabsProps> = ({ tabItems }) => {
  return (
    <TabListContainer>
      {tabItems.map((item) => (
        <Tab key={item.title}>
          <p>{item.title}</p>
          <p>{item.value}</p>
        </Tab>
      ))}
    </TabListContainer>
  );
};

export default TabsDisplayAccountSum;

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
