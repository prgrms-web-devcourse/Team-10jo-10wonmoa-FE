import React, { useState } from 'react';
import styled from '@emotion/styled';
import { theme } from '@styles';

type TabItem = {
  value: string;
  title: string;
};

type TabClickHandler = (
  e: React.MouseEvent<HTMLDivElement>,
  item: TabItem
) => void;

interface TabsProps {
  TabItems: TabItem[];
  onClick: TabClickHandler;
}

const Tabs = ({ TabItems, onClick }: TabsProps) => {
  const [selectedItem, setSelectedItem] = useState(TabItems[0].title);

  const handleClick: TabClickHandler = (e, item) => {
    setSelectedItem(item.title);
    onClick(e, item);
  };

  return (
    <TabListContainer>
      {TabItems.map((item) => (
        <Tab
          key={item.title}
          className={item.title === selectedItem ? 'active' : ''}
          onClick={(e) => handleClick(e, item)}
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
