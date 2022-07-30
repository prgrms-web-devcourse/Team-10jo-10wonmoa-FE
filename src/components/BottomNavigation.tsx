import styled from '@emotion/styled';
import Destination from './Destination';
import { useState } from 'react';

const Tabs = {
  HOME: 'HOME',
  PROFILE: 'PROFILE',
  STATICS: 'STATICS',
} as const;

type selectedTab = typeof Tabs[keyof typeof Tabs];

const BottomNavigation = () => {
  const [selectedTab, setSelectedTab] = useState<selectedTab>(Tabs.HOME);

  return (
    <Container>
      <Destination
        selected={selectedTab === Tabs.HOME ? true : false}
        text={Tabs.HOME}
        icon={Tabs.HOME}
        onClick={() => {
          setSelectedTab(Tabs.HOME);
        }}
      />

      <Destination
        selected={selectedTab === Tabs.PROFILE ? true : false}
        text={Tabs.PROFILE}
        icon={Tabs.PROFILE}
        onClick={() => {
          setSelectedTab(Tabs.PROFILE);
        }}
      />

      <Destination
        selected={selectedTab === Tabs.STATICS ? true : false}
        text={Tabs.STATICS}
        icon={Tabs.STATICS}
        onClick={() => {
          setSelectedTab(Tabs.STATICS);
        }}
      />
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export default BottomNavigation;
