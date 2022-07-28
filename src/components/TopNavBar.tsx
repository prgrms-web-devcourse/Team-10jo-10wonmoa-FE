import styled from '@emotion/styled';

import GoBackIcon from './GoBackIcon';
import TopNavOutline from './TopNavOutline';

interface NavBarProps {
  isActiveGoBack?: boolean;
  title?: string;
  children?: React.ReactNode;
}

const NavBar: React.FC<NavBarProps> = ({
  isActiveGoBack = false,
  ...props
}) => {
  return (
    <TopNavOutline>
      {isActiveGoBack && <GoBackIcon />}
      <NavTitle>{props.title}</NavTitle>
    </TopNavOutline>
  );
};

const NavTitle = styled.p`
  font-size: 2.2rem;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
`;

export default NavBar;
