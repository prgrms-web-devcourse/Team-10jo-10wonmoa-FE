import React from 'react';
import styled from '@emotion/styled';
import { ChevronLeft, ChevronRight } from 'react-feather';

export interface DateSelectorProps {
  date: string;
  onChangePev: () => void;
  onChangeNext: () => void;
}

const DateSelector: React.FC<DateSelectorProps> = (props) => {
  return (
    <StyledDateSelector>
      <a onClick={props.onChangePev}>
        <ChevronLeft />
      </a>
      <DateText>{props.date}</DateText>
      <a onClick={props.onChangeNext}>
        <ChevronRight />
      </a>
    </StyledDateSelector>
  );
};

export default DateSelector;

const StyledDateSelector = styled.div`
  display: flex;
  height: 100%;
  justify-content: space-around;
  align-items: center;
`;

const DateText = styled.p`
  height: 2rem;
`;
