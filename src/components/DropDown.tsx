import styled from '@emotion/styled';
import { theme } from '@styles';
import React, { useState, Dispatch, SetStateAction } from 'react';
import { ChevronDown } from 'react-feather';

interface DropDownInterface {
  type?: 'search' | 'statistics';
  setIsMonth: Dispatch<SetStateAction<boolean>>;
  initialMenu: string;
}

const DropDown: React.FC<DropDownInterface> = ({
  type = 'statistics',
  setIsMonth,
  initialMenu,
}) => {
  const [selectedMenu, setSelectedMenu] = useState<string | null>(initialMenu);
  const [showMenu, setShowMenu] = useState(false);

  const handleShowMenu = () => setShowMenu(!showMenu);

  const handleSelectMenu = (e: React.MouseEvent) => {
    const eText = (e.target as HTMLElement).textContent;
    setSelectedMenu(eText);
    handleShowMenu();
    eText === '월별' ? setIsMonth(true) : setIsMonth(false);
  };

  return (
    <MenuWrapper
      style={{
        height: showMenu ? '6rem' : '2rem',
        marginTop: showMenu ? '4rem' : '',
      }}
    >
      <SelectedMenu onClick={handleShowMenu}>
        {selectedMenu} <ChevronDown />
      </SelectedMenu>
      {showMenu ? (
        <Menus>
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
        </Menus>
      ) : null}
    </MenuWrapper>
  );
};

export default DropDown;

const MenuWrapper = styled.div`
  width: 5rem;
  border: 1px solid ${(props) => props.theme.$gray_dark};
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.$white};
  padding: 0.2rem 0.4rem;
`;

const SelectedMenu = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Menus = styled.div`
  background-color: ${(props) => props.theme.$white};
  padding: 0.3rem 2rem 0.3rem 0rem;
`;

const Menu = styled.div`
  &:hover {
    color: ${(props) => props.theme.$primary};
  }
  z-index: 10;
`;
