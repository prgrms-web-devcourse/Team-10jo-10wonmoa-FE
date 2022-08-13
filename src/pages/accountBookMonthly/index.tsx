import React from 'react';
import styled from '@emotion/styled';
import { useAccountBookMonthly } from '@hooks/account';
import { AccountBookMonthlyCard, AccountBookEmpty } from '@components/account';
import { Spinner } from '@components';

const AccountBookMonthly = () => {
  const { data: monthlyAccounts, isLoading, isEmpty } = useAccountBookMonthly();

  if (isLoading) {
    return <Spinner />;
  }

  if (isEmpty) {
    return <AccountBookEmpty />;
  }

  return (
    <CardArea>
      {monthlyAccounts.map((item: MonthlyAccount, idx: number) => (
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
