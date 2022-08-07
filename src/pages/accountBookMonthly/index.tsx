import React from 'react';
import styled from '@emotion/styled';
import { currencyFormatter } from '@utils/formatter';
import { useAccountBookMonthly } from '@hooks/account';
import dayjs from 'dayjs';

const AccountBookMonthly = () => {
  const { data } = useAccountBookMonthly();

  const isExist = data.length > 0;

  if (!isExist) {
    return <p>등록 된 데이터가 없습니다.</p>;
  }

  const monthRangeFormatter = (month: number) => {
    const startOfMonth = dayjs().date(month).startOf('month').format('MM.DD');
    const endOfMonth = dayjs().date(month).endOf('month').format('MM.DD');
    return `${startOfMonth} ~ ${endOfMonth}`;
  };

  return (
    <>
      {data.map((item: MonthlyAccount, idx: number) => (
        <Card key={idx}>
          <div>
            <p>{item.month}월</p>
            <p>{monthRangeFormatter(item.month)}</p>
          </div>
          <div>{currencyFormatter(item.incomeSum)}</div>
          <div>{currencyFormatter(item.expenditureSum)}</div>
        </Card>
      ))}
    </>
  );
};

export default AccountBookMonthly;

const Card = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  text-align: center;
  height: 3rem;
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.$gray_medium};
`;
