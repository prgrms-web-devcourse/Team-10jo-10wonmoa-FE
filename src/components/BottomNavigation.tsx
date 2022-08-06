import styled from '@emotion/styled';
import Destination from './Destination';
import { useLocation, Link } from 'react-router-dom';

const Tabs = {
  ACCOUNT_BOOK: 'ACCOUNT_BOOK',
  BUDGET: 'BUDGET',
  STATICS: 'STATICS',
} as const;

const BottomNavigation = () => {
  const location = useLocation();

  return (
    <Container>
      <Link to="/account-book/daily">
        <Destination
          selected={location.pathname === '/account-book'}
          text={'가계부'}
          icon={Tabs.ACCOUNT_BOOK}
        />
      </Link>

      <Link to="/statistics">
        <Destination
          selected={location.pathname === '/statistics'}
          text={'통계'}
          icon={Tabs.STATICS}
        />
      </Link>

      <Link to="/budget">
        <Destination
          selected={location.pathname === '/budget'}
          text={'예산'}
          icon={Tabs.BUDGET}
        />
      </Link>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  bottom: 0;
  background: #fff;
  padding: 0 30px;
  width: 100%;
  height: 7rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default BottomNavigation;
