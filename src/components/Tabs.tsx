import React, { useState } from 'react';
import styled from '@emotion/styled';
import type { TabItem } from '@types';

interface TabsProps {
  tabItems: TabItem[];
  onClick: (item: TabItem) => void;
  children?: React.ReactNode;
  initialItem?: TabItem;
  total?: string;
}

const Tabs = ({
  tabItems,
  onClick,
  children,
  initialItem,
  total,
}: TabsProps) => {
  const [selectedItem, setSelectedItem] = useState(
    initialItem?.title ?? tabItems[0].title
  );

  const handleClick = (item: TabItem) => {
    setSelectedItem(item.title);
    onClick(item);
  };

  return (
    <>
      <TabListContainer>
        {tabItems.map((item) => (
          <Tab
            key={item.title}
            className={item.title === selectedItem ? 'active' : ''}
            onClick={() => handleClick(item)}
          >
            {item.title}
            <ToTal className={item.title != selectedItem ? 'noneTotal' : ''}>
              {total}
            </ToTal>
          </Tab>
        ))}
      </TabListContainer>
      {children}
    </>
  );
};

export default Tabs;

const TabListContainer = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
`;

const Tab = styled.div`
  display: flex;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-bottom: 1px solid ${(props) => props.theme.$gray_dark};
  color: ${(props) => props.theme.$gray_dark};
  background-color: ${(props) => props.theme.$white};
  font-size: 1.2rem;

  &.active {
    background-color: ${(props) => props.theme.$secondary};
    border-bottom: 1px solid ${(props) => props.theme.$primary};
    color: ${(props) => props.theme.$primary};
  }
`;

const ToTal = styled.span`
  margin-left: 1rem;
  &.noneTotal {
    display: none;
  }
`;
