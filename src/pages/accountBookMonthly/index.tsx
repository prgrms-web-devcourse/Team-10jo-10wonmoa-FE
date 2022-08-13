import React from 'react';
import styled from '@emotion/styled';
import { useAccountBookMonthly } from '@hooks/account';
import { AccountBookMonthlyCard } from '@components/account';

const AccountBookMonthly = () => {
  const { data } = useAccountBookMonthly();

  const isExist = data.length > 0;

  if (!isExist) {
    return <p>등록 된 데이터가 없습니다.</p>;
  }

  return (
    <CardArea>
      {data.map((item: MonthlyAccount, idx: number) => (
        <AccountBookMonthlyCard item={item} key={idx} />
      ))}
    </CardArea>
  );
};

export default AccountBookMonthly;

const CardArea = styled.div`
  width: 100%;
  padding-bottom: 7rem;
  overflow-y: scroll;
`;
