import React from 'react';
import styled from '@emotion/styled';
import { theme } from '@styles';

type DailySum = {
  registerDate: string;
  dayIncome: number;
  dayExpenditure: number;
};
interface AccountBookDailySumProps {
  dailySum: DailySum;
}

const AccountBookDailySum: React.FC<AccountBookDailySumProps> = (props) => {
  return (
    <Container>
      <StrongText>19</StrongText>
      <FilledText>화요일</FilledText>
      <p>2022.07</p>
      <P color={theme.$blue}>{props.dailySum.dayIncome}</P>
      <P color={theme.$red}>{props.dailySum.dayExpenditure}</P>
    </Container>
  );
};

export default AccountBookDailySum;

const Container = styled.div`
  width: 100%;
  height: 2rem;
  padding: 2rem 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: solid 1px lightgray;
`;

const StrongText = styled.strong`
  font-size: 1.6rem;
  font-weight: bolder;
`;

const FilledText = styled.p`
  width: 5.2rem;
  background: gray;
  padding: 0.3rem;
  text-align: center;
  border-radius: 8px;
  color: white;
`;

const P = styled.p(
  {
    fontSize: '1rem',
  },
  ({ color }) => ({ color })
);
