import React from 'react';
import styled from '@emotion/styled';
import { ChevronLeft, ChevronRight } from 'react-feather';

export interface MonthSelectorProps {
  date: string;
  onChangeNextMonth: () => void;
  onChangePrevMonth: () => void;
}

const MonthSelector: React.FC<MonthSelectorProps> = (props) => {
  return (
    <StyledMonthSelector>
      <a onClick={props.onChangePrevMonth}>
        <ChevronLeft />
      </a>
      <DateText>{props.date}</DateText>
      <a onClick={props.onChangeNextMonth}>
        <ChevronRight />
      </a>
    </StyledMonthSelector>
  );
};

export default MonthSelector;

const StyledMonthSelector = styled.div`
  display: flex;
  height: 100%;
  justify-content: space-around;
  align-items: center;
`;

const DateText = styled.p`
  height: 2rem;
`;
