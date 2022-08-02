import styled from '@emotion/styled';
import { theme } from '@styles';
import React, { useState } from 'react';
import { ChevronDown } from 'react-feather';
import { useClickAway } from '@hooks';
interface DropDownInterface {
  type?: 'search' | 'statistics';
  top?: number;
  right?: number;
}

const DropDown: React.FC<DropDownInterface> = ({
  type = 'statistics',
  top = 2,
  right = 2,
}) => {
  const [selectedMenu, setSelectedMenu] = useState('월별');
  const [showMenu, setShowMenu] = useState(false);
  const handleShowMenu = () => setShowMenu(!showMenu);
  const handleClickAway = () => {
    if (showMenu) handleShowMenu();
  };

  const selectRef = useClickAway(handleClickAway);
  const handleSelectMenu = (e: React.MouseEvent) => {
    const eText = (e.target as HTMLElement).textContent;
    (e.target as HTMLElement).style.color = 'red';
    setSelectedMenu(eText || '');
    handleShowMenu();
  };
  return (
    <MenuWrapper top={top} right={right} ref={selectRef}>
      <SelectedMenu onClick={handleShowMenu}>
        {selectedMenu} <ChevronDown />
      </SelectedMenu>
      {showMenu ? (
        <div className="월별">
          <Menu
            style={{
              color: selectedMenu === '월별' ? `${theme.$primary}` : '',
            }}
            onClick={handleSelectMenu}
          >
            월별
          </Menu>
          <Menu
            style={{
              color: selectedMenu === '연별' ? `${theme.$primary}` : '',
            }}
            onClick={handleSelectMenu}
          >
            연별
          </Menu>
          {type === 'statistics' ? null : (
            <Menu
              style={{
                color: selectedMenu === '기간' ? `${theme.$primary}` : '',
              }}
              onClick={handleSelectMenu}
            >
              기간
            </Menu>
          )}
        </div>
      ) : null}
    </MenuWrapper>
  );
};

export default DropDown;

const MenuWrapper = styled.div<{ top?: number; right?: number }>`
  width: 5rem;
  border: 1px solid ${(props) => props.theme.$gray_dark};
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.$white};
  padding: 0.2rem 0.6rem;
  z-index: 10;
  position: absolute;
  top: ${(props) => props.top}rem;
  right: ${(props) => props.right}rem;
`;

const SelectedMenu = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Menu = styled.div`
  padding: 0.2rem 0;
  &:hover {
    color: ${(props) => props.theme.$primary};
  }
`;
