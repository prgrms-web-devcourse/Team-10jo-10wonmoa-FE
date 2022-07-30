import React from 'react';
import { BottomNavigation, TopNavMonthSelector, Tabs } from '@components';
import { useNavigate, Outlet } from 'react-router-dom';
import { useMonthSelector } from '@hooks';

const AccountBook = () => {
  const navigate = useNavigate();

  const { date, monthNextHandler, monthPrevHandler } = useMonthSelector(
    new Date()
  );
  const ACCOUNT_TYPE = [
    {
      value: 'daily',
      title: '일일',
    },
    {
      value: 'calendar',
      title: '캘린더',
    },
    {
      value: 'monthly',
      title: '월간',
    },
  ];

  const tabClickHandler = (
    event: React.MouseEvent<HTMLDivElement>,
    item = ACCOUNT_TYPE[0]
  ) => {
    navigate(`${item.value}`);
    console.log(event);
  };

  return (
    <>
      <TopNavMonthSelector
        date={date}
        monthNextHandler={monthNextHandler}
        monthPrevHandler={monthPrevHandler}
      />
      <Tabs TabItems={ACCOUNT_TYPE} onClick={tabClickHandler} />
      <Outlet />
      <BottomNavigation />
    </>
  );
};

export default AccountBook;
