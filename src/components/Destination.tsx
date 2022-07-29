import React, { ReactComponentElement, ReactElement } from 'react';
import { ReactComponent as HomeIcon } from '@assets/Icon/Home.svg';
import { ReactComponent as ProfileIcon } from '@assets/Icon/Profile.svg';
import { ReactComponent as SearchIcon } from '@assets/Icon/Search.svg';
import styled from '@emotion/styled';
import { theme } from '@styles';

interface DestinationProps {
  selected: boolean;
  text: string;
  icon: 'HOME' | 'PROFILE' | 'SEARCH';
  onClick: () => void;
}

const Destination = ({ selected, text, icon, onClick }: DestinationProps) => {
  return (
    <Container onClick={onClick} selected={selected}>
      {icon === 'HOME' && <HomeIcon />}
      {icon === 'PROFILE' && <ProfileIcon />}
      {icon === 'SEARCH' && <SearchIcon />}
      <DestinationText>{text}</DestinationText>
    </Container>
  );
};

export default Destination;

type DestinationStyle = {
  selected: boolean;
};

const Container = styled.div<DestinationStyle>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  padding: 6px;
  &:hover {
    cursor: pointer;
  }
  color: ${(props) => (props.selected ? theme.$primary : '')};
  svg {
    fill: ${(props) => (props.selected ? theme.$primary : '')};
  }
`;

const DestinationText = styled.span`
  margin-top: 10px;
`;
