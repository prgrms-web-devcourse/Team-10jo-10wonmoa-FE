import React, { useState } from 'react';
import styled from '@emotion/styled';
import Calendar from '@toast-ui/react-calendar';
import ToastUICalendar from '@toast-ui/react-calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
const AccountBookCalendar = () => {
  const calendars = [
    {
      id: 'cal1',
      name: 'My Calendar',
      color: '#ffffff',
      bgColor: '#9e5fff',
      dragBgColor: '#9e5fff',
      borderColor: '#9e5fff',
    },
    {
      id: 'cal2',
      color: '#FE2E2E',
      name: 'Another Calendar',
      backgroundColor: '#8181F7',
    },
  ];
  const initialEvents = [
    {
      id: '1',
      calendarId: 'cal1',
      title: 'Income',
      category: 'Income',
      isAllDay: true,
      start: '2022-08-08',
      isVisible: true,
      //end: '2022-08-08T13:30',
    },
    {
      id: '1',
      calendarId: 'cal1',
      title: 'Expend',
      body: 'Expend',
      category: 'Expend',
      isAllDay: true,
      isVisible: true,
      start: '2022-08-08',
      //end: '2022-08-08T13:30',
    },
    {
      id: '2',
      calendarId: 'cal2',
      title: 'Expenditures',
      body: 'Expenditures',
      category: 'Expenditures',
      start: '2022-08-28T15:00:00',
      end: '2022-08-29T15:30:00',
      isVisible: true,
    },
  ];

  const dummy = {
    results: [
      {
        registerDate: '2022-07-19T22:11',
        dayIncome: 0,
        dayExpenditure: 0,
        dayTotal: 0,
      },
      {
        registerDate: '2022-07-20T22:11',
        dayIncome: 60000,
        dayExpenditure: 20000,
        dayTotal: 40000,
      },
      {
        registerDate: '2022-07-21T22:11',
        dayIncome: 60000,
        dayExpenditure: 20000,
        dayTotal: 40000,
      },
    ],
  };
  return (
    <CalendarWrapper>
      <Calendar
        height="500px"
        view="month"
        month={{
          isAlways6Weeks: true,
          visibleEventCount: 3,
          dayNames: ['일', '월', '화', '수', '목', '금', '토'],
        }}
        calendars={calendars}
        events={initialEvents}
        useDetailPopup={true}
      />
    </CalendarWrapper>
  );
};
export default AccountBookCalendar;

const CalendarWrapper = styled.div`
  width: 100%;
`;
