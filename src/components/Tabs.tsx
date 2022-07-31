import React, { useState } from 'react';
import styled from '@emotion/styled';
import { theme } from '@styles';

export type TabItem = {
  value: string;
  title: string;
};

interface TabsProps {
  tabItems: TabItem[];
  onClick: (item: TabItem) => void;
}

const Tabs = ({ tabItems, onClick }: TabsProps) => {
  const [selectedItem, setSelectedItem] = useState(tabItems[0].title);

  const handleClick = (item: TabItem) => {
    setSelectedItem(item.title);
    onClick(item);
  };

  return (
    <TabListContainer>
      {tabItems.map((item) => (
        <Tab
          key={item.title}
          className={item.title === selectedItem ? 'active' : ''}
          onClick={() => handleClick(item)}
        >
          {item.title}
        </Tab>
      ))}
    </TabListContainer>
  );
};

export default Tabs;

const TabListContainer = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
`;

const Tab = styled.div`
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
