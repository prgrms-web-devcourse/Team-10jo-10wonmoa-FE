import styled from '@emotion/styled';
import Destination from './Destination';
import { useLocation } from 'react-router-dom';

const Tabs = {
  ACCOUNT_BOOK: 'ACCOUNT_BOOK',
  BUDGET: 'BUDGET',
  STATICS: 'STATICS',
  PROFILE: 'PROFILE',
} as const;

const BottomNavigation = () => {
  const location = useLocation();

  return (
    <Container>
      <Destination
        selected={location.pathname.includes('/account-book/daily')}
        text={'가계부'}
        icon={Tabs.ACCOUNT_BOOK}
        linkTo={'/account-book/daily'}
      />
      <Destination
        selected={location.pathname.includes('/statistics')}
        text={'통계'}
        icon={Tabs.STATICS}
        linkTo={'/statistics'}
      />
      <Destination
        selected={location.pathname.includes('/budget')}
        text={'예산'}
        icon={Tabs.BUDGET}
        linkTo={'/budget'}
      />

      <Destination
        selected={location.pathname.includes('/profile')}
        text={'프로필'}
        icon={Tabs.PROFILE}
        linkTo={'/profile'}
      />
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  bottom: 0;
  background: #fff;
  width: 100%;
  height: ${({ theme }) => theme.$bottom_navigation_height};
  display: flex;
  align-items: center;
  border-top: 2px solid ${({ theme }) => theme.$gray_light};
`;

export default BottomNavigation;
