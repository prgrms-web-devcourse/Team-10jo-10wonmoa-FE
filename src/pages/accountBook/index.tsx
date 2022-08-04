import React from 'react';
import { theme } from '@styles';
import { BottomNavigation, TopNavMonthSelector } from '@components';
import { TabsDisplayAccountSum, TabsNavigation } from '@components/account';
import { Outlet } from 'react-router-dom';
import { useMonthSelector } from '@hooks';
import { currencyFormatter } from '@utils/formatter/currencyFormatter';
import useAccountBookSum from '@hooks/account/useAccountBookSum';

const AccountBook = () => {
  const { date, handlePrevMonth, handleNextMonth } = useMonthSelector();
  const { data: monthSumResult } = useAccountBookSum();

  const ACCOUNT_BOOK_TAB_ITEMS = [
    {
      path: 'daily',
      title: '일일',
    },
    {
      path: 'monthly',
      title: '월간',
    },
  ];

  const ACCOUNT_TYPE = [
    {
      value: currencyFormatter(monthSumResult.incomeSum),
      title: '수입',
      color: theme.$blue,
    },
    {
      value: currencyFormatter(monthSumResult.expenditureSum),
      title: '지출',
      color: theme.$red,
    },
    {
      value: currencyFormatter(monthSumResult.totalSum),
      title: '합계',
    },
  ];

  return (
    <>
      <TopNavMonthSelector
        date={date}
        onChangePrevMonth={handlePrevMonth}
        onChangeNextMonth={handleNextMonth}
      />
      <TabsNavigation tabItems={ACCOUNT_BOOK_TAB_ITEMS} />
      <TabsDisplayAccountSum tabItems={ACCOUNT_TYPE} />
      <Outlet />
      <BottomNavigation />
    </>
  );
};

export default AccountBook;
