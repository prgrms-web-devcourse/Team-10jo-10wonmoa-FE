import React from 'react';
import { ReactComponent as HomeIcon } from '@assets/Icon/Home.svg';
import { ReactComponent as ProfileIcon } from '@assets/Icon/Profile.svg';
import { ReactComponent as StaticsIcon } from '@assets/Icon/Statics.svg';
import styled from '@emotion/styled';
import { theme } from '@styles';

interface DestinationProps {
  selected: boolean;
  text: string;
  icon: 'HOME' | 'PROFILE' | 'STATICS';
}

const Destination = ({ selected, text, icon }: DestinationProps) => {
  return (
    <Container selected={selected}>
      {icon === 'HOME' && <HomeIcon />}
      {icon === 'PROFILE' && <ProfileIcon />}
      {icon === 'STATICS' && <StaticsIcon />}
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
