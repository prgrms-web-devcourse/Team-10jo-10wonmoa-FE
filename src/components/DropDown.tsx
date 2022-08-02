import styled from '@emotion/styled';
import { theme } from '@styles';
import React, { useState } from 'react';
import { ChevronDown } from 'react-feather';
interface DropDownInterface {
  type?: 'search' | 'statistics';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  //setDate?
}

const DropDown: React.FC<DropDownInterface> = ({
  onClick,
  type = 'statistics',
}) => {
  const [selectedMenu, setSelectedMenu] = useState('월별');
  const [showMenu, setShowMenu] = useState(false);
  // false를 상단 페이지에서 상태를 내려줘야 함
  const handleShowMenu = () => setShowMenu(!showMenu);
  const handleSelectMenu = (e: React.MouseEvent) => {
    const eText = (e.target as HTMLElement).textContent;
    setSelectedMenu(eText || '');
    handleShowMenu();
  };
  return (
    <MenuWrapper>
      <SelectedMenu onClick={handleShowMenu}>
        {selectedMenu} <ChevronDown />
      </SelectedMenu>
      {showMenu ? (
        <div className="월별">
          <Menu onClick={handleSelectMenu}>월별</Menu>
          <Menu onClick={handleSelectMenu}>연별</Menu>
          {type === 'statistics' ? null : (
            <Menu onClick={handleSelectMenu}>기간</Menu>
          )}
        </div>
      ) : null}
    </MenuWrapper>
  );
};

export default DropDown;

const MenuWrapper = styled.div`
  width: 5rem;
  border: 1px solid ${theme.$gray_dark};
  border-radius: 0.5rem;
  padding: 0.2rem 0.6rem;
`;

const SelectedMenu = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Menu = styled.div`
  padding: 0.2rem 0;
  &:hover {
    color: ${theme.$primary};
  }
`;
