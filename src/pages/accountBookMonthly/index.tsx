import React from 'react';
import styled from '@emotion/styled';
import { currencyFormatter } from '@utils/formatter';

import { useAccountBookMonthly } from '@hooks/account';
const AccountBookMonthly = () => {
  const { data } = useAccountBookMonthly();

  const isExist = data.length > 0;

  if (!isExist) {
    <>
      <p>등록 된 데이터가 없습니다.</p>
    </>;
  }

  return (
    <>
      {data.map((item: MonthlyAccount, idx: number) => (
        <Card key={idx}>
          <div>
            <p>{item.month}월</p>
            <p>8.1~8.30</p>
          </div>
          <div>{currencyFormatter(item.incomeSum)}</div>
          <div>-{currencyFormatter(item.expenditureSum)}</div>
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
