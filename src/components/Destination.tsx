import React from 'react';
import { ReactComponent as AccountBookIcon } from '@assets/Icon/AccountBook.svg';
import { ReactComponent as BudgetIcon } from '@assets/Icon/Budget.svg';
import { ReactComponent as StaticsIcon } from '@assets/Icon/Statics.svg';
import styled from '@emotion/styled';
import { theme } from '@styles';
import { useNavigate } from 'react-router-dom';
interface DestinationProps {
  selected: boolean;
  text: string;
  icon: 'ACCOUNT_BOOK' | 'BUDGET' | 'STATICS';
  linkTo: '/account-book/daily' | '/statistics' | '/budget';
}

const Destination = ({ selected, text, icon, linkTo }: DestinationProps) => {
  const navigate = useNavigate();
  return (
    <Container selected={selected} onClick={() => navigate(linkTo)}>
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

const Container = styled.button<DestinationStyle>`
  border: none;
  outline: none;
  background-color: ${(props) => props.theme.$white};
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 100%;
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
