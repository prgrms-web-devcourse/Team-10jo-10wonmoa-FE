import React from 'react';
import styled from '@emotion/styled';
import { dateFormatter, currencyFormatter } from '@utils/formatter';

const AccountBookDailySum = <T extends DailySum>(props: T) => {
  return (
    <StyledAccountBookDailySum>
      <div>
        <span>{dateFormatter(props.registerDate, 'DAY')}</span>
        <span>{dateFormatter(props.registerDate, 'WEEKDAY')}요일</span>
      </div>
      <div>
        <span>{currencyFormatter(props.dayIncome)}원</span>
        <span>{currencyFormatter(props.dayExpenditure)}원</span>
      </div>
    </StyledAccountBookDailySum>
  );
};

export default AccountBookDailySum;

const StyledAccountBookDailySum = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  border-bottom: solid 1px lightgray;

  & div:nth-of-type(1) {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    gap: 1rem;
    & span:nth-of-type(1) {
      font-size: 1.6rem;
      font-weight: bolder;
    }
    & span:nth-of-type(2) {
      font-size: 1rem;
      color: ${(props) => props.theme.$gray_medium};
    }
  }

  & div:nth-of-type(2) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    text-align: right;
    & span:nth-of-type(1) {
      font-size: 1rem;
      font-weight: 700;
      color: ${(props) => props.theme.$blue};
    }
    & span:nth-of-type(2) {
      font-size: 1rem;
      font-weight: 700;
      color: ${(props) => props.theme.$red};
    }
  }
`;
