import React from 'react';
import { BottomNavigation, TopNavMonthSelector } from '@components';
import { TabsDisplayAccountSum, TabsNavigation } from '@components/account';
import { Outlet, useLocation } from 'react-router-dom';
import { useMonthSelector } from '@hooks';
import { useAccountBookSum } from '@hooks/account';
import type { DateSelectorProps } from '@components/DateSelector';

const AccountBook = () => {
  const {
    monthDate,
    yearDate,
    handlePrevMonth,
    handleNextMonth,
    handleNextYear,
    handlePrevYear,
  } = useMonthSelector();
  const { monthSumResult, yearSumResult } = useAccountBookSum();

  const { pathname } = useLocation();
  const [, , path] = pathname.split('/');

  type AccountBookPathTypes = 'daily' | 'monthly' | 'calendar';

  const isAccountBookPath = (path: string): path is AccountBookPathTypes => {
    if (path === 'daily') return true;
    if (path === 'monthly') return true;
    if (path === 'calendar') return true;
    return false;
  };

  if (!isAccountBookPath(path)) {
    throw new Error('정상적이지 않은 경로로 접근했습니다.');
  }
  const sumResult = path === 'monthly' ? yearSumResult : monthSumResult;

  const dateSelectorHandlers: Record<AccountBookPathTypes, DateSelectorProps> =
    {
      daily: {
        date: monthDate,
        onChangePev: handlePrevMonth,
        onChangeNext: handleNextMonth,
      },
      monthly: {
        date: yearDate,
        onChangePev: handlePrevYear,
        onChangeNext: handleNextYear,
      },
      calendar: {
        date: monthDate,
        onChangePev: handlePrevMonth,
        onChangeNext: handleNextMonth,
      },
    };

  const ACCOUNT_BOOK_TAB_ITEMS = [
    {
      path: 'daily',
      title: '일일',
    },
    {
      path: 'calendar',
      title: '달력',
    },
    {
      path: 'monthly',
      title: '월간',
    },
  ];

  return (
    <>
      <TopNavMonthSelector
        date={dateSelectorHandlers[path].date}
        onChangePev={dateSelectorHandlers[path].onChangePev}
        onChangeNext={dateSelectorHandlers[path].onChangeNext}
      />
      <TabsNavigation tabItems={ACCOUNT_BOOK_TAB_ITEMS} />
      <TabsDisplayAccountSum sumResult={sumResult} />
      <Outlet />
      <BottomNavigation />
    </>
  );
};

export default AccountBook;
