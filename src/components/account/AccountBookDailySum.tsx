import React from 'react';
import styled from '@emotion/styled';
import { theme } from '@styles';
import { dateFormatter, currencyFormatter } from '@utils/formatter';

const AccountBookDailySum: React.FC<DailySum> = (props) => {
  return (
    <Container>
      <StrongText>{dateFormatter(props.registerDate, 'DAY')}</StrongText>
      <FilledText>{dateFormatter(props.registerDate, 'WEEKDAY')}</FilledText>
      <p>{dateFormatter(props.registerDate, 'YEAR_MONTH_DAY_DASH')}</p>
      <P color={theme.$blue}>{currencyFormatter(props.dayIncome)}</P>
      <P color={theme.$red}>{currencyFormatter(props.dayExpenditure)}</P>
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
