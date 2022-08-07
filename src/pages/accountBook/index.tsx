import React from 'react';
import { theme } from '@styles';
import { BottomNavigation, TopNavMonthSelector } from '@components';
import { TabsDisplayAccountSum, TabsNavigation } from '@components/account';
import { Outlet, useLocation } from 'react-router-dom';
import { useMonthSelector } from '@hooks';
import { currencyFormatter, dateFormatter } from '@utils/formatter';
import { useAccountBookSum } from '@hooks/account';

const AccountBook = () => {
  const { date, handlePrevMonth, handleNextMonth } = useMonthSelector();
  const { monthSumResult, yearSumResult } = useAccountBookSum();

  const { pathname } = useLocation();
  const [, , path] = pathname.split('/');
  const sumResult = path == 'monthly' ? yearSumResult : monthSumResult;

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
      value: currencyFormatter(sumResult.incomeSum),
      title: '수입',
      color: theme.$blue,
    },
    {
      value: currencyFormatter(sumResult.expenditureSum),
      title: '지출',
      color: theme.$red,
    },
    {
      value: currencyFormatter(sumResult.totalSum),
      title: '합계',
    },
  ];

  return (
    <>
      <TopNavMonthSelector
        date={dateFormatter(date.toString(), 'YEAR_DAY_DASH')}
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
