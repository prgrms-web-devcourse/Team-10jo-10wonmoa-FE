import styled from '@emotion/styled';

interface NavOutlineProps {
  children?: React.ReactNode;
}

const NavBar: React.FC<NavOutlineProps> = (props) => {
  return <NavBarContainer>{props.children}</NavBarContainer>;
};

const NavBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3.6rem;
  width: 100%;
  position: relative;
  top: 0;
  background-color: ${(props) => props.theme.$white};
`;

export default NavBar;
