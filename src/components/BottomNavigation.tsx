import styled from '@emotion/styled';
import Destination from './Destination';
import { useLocation, Link } from 'react-router-dom';

const Tabs = {
  HOME: 'HOME',
  PROFILE: 'PROFILE',
  STATICS: 'STATICS',
} as const;

const BottomNavigation = () => {
  const location = useLocation();

  return (
    <Container>
      <Link to="/">
        <Destination
          selected={location.pathname === '/'}
          text={Tabs.HOME}
          icon={Tabs.HOME}
        />
      </Link>

      <Link to="/profile">
        <Destination
          selected={location.pathname === '/profile'}
          text={Tabs.PROFILE}
          icon={Tabs.PROFILE}
        />
      </Link>

      <Link to="/statistics">
        <Destination
          selected={location.pathname === '/statistics'}
          text={Tabs.STATICS}
          icon={Tabs.STATICS}
        />
      </Link>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  bottom: 0;
  background: #fff;
  width: 100%;
  height: 7rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export default BottomNavigation;
