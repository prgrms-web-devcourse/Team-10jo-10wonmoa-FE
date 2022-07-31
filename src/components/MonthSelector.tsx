import React from 'react';
import styled from '@emotion/styled';
import { ChevronLeft, ChevronRight } from 'react-feather';

export interface MonthSelectorProps {
  date: Date;
  onChangeNextMonth: () => void;
  onChangePrevMonth: () => void;
}

const MonthSelector: React.FC<MonthSelectorProps> = (props) => {
  const opts = {
    month: 'numeric',
    year: 'numeric',
  } as const;

  const formattedToday = Intl.DateTimeFormat('ko-KR', opts).format(props.date);

  return (
    <StyledMonthSelector>
      <a onClick={props.onChangePrevMonth}>
        <ChevronLeft />
      </a>
      <DateText>{formattedToday}</DateText>
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
  justify-content: center;
  align-items: center;
`;

const DateText = styled.p`
  height: 2rem;
`;
