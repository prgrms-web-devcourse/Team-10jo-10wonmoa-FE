import React from 'react';
import styled from '@emotion/styled';
import { theme } from '@styles';
import { dateFormatter, currencyFormatter } from '@utils/formatter';

const AccountBookDailySum = <T extends DailySum>(props: T) => {
  return (
    <Container>
      <p>{dateFormatter(props.registerDate, 'DAY')}</p>
      <p>{dateFormatter(props.registerDate, 'WEEKDAY')}</p>
      <p color={theme.$blue}>{currencyFormatter(props.dayIncome)}원</p>
      <p color={theme.$red}>{currencyFormatter(props.dayExpenditure)}원</p>
    </Container>
  );
};

export default AccountBookDailySum;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr repeat(4);
  width: 100%;
  height: 2rem;
  padding: 2rem 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: solid 1px lightgray;

  & p:nth-of-type(1) {
    font-size: 1.6rem;
    font-weight: bolder;
  }
  & p:nth-of-type(2) {
    width: 5.2rem;
    background: gray;
    padding: 0.3rem;
    text-align: center;
    border-radius: 8px;
    color: white;
  }
  & p:nth-of-type(3) {
    font-size: 1rem;
    font-weight: 500;
    color: ${(props) => props.theme.$blue};
  }
  & p:nth-of-type(4) {
    font-size: 1rem;
    font-weight: 500;
    color: ${(props) => props.theme.$red};
  }
`;
