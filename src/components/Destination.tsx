import React from 'react';
import { ReactComponent as AccountBookIcon } from '@assets/Icon/AccountBook.svg';
import { ReactComponent as BudgetIcon } from '@assets/Icon/Budget.svg';
import { ReactComponent as StaticsIcon } from '@assets/Icon/Statics.svg';
import styled from '@emotion/styled';
import { theme } from '@styles';

interface DestinationProps {
  selected: boolean;
  text: string;
  icon: 'ACCOUNT_BOOK' | 'BUDGET' | 'STATICS';
}

const Destination = ({ selected, text, icon }: DestinationProps) => {
  return (
    <Container selected={selected}>
      {icon === 'ACCOUNT_BOOK' && <AccountBookIcon />}
      {icon === 'BUDGET' && <BudgetIcon />}
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
  width: 5rem;
  align-items: center;
  border-radius: 6px;
  padding: 6px;
  &:hover {
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }

  color: ${(props) => (props.selected ? theme.$primary : '')};

  svg {
    fill: ${(props) => (props.selected ? theme.$primary : '')};
  }
`;

const DestinationText = styled.span`
  margin-top: 10px;
`;
