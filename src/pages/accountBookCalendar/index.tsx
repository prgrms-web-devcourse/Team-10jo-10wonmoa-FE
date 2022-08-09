import React, {
  useState,
  useCallback,
  useRef,
  MouseEvent,
  useEffect,
} from 'react';
import styled from '@emotion/styled';
import Calendar from '@toast-ui/react-calendar';

import '@toast-ui/calendar/dist/toastui-calendar.min.css';
const AccountBookCalendar = () => {
  const calendars = [
    {
      id: 'cal1',
      name: 'My Calendar',
      backgroundColor: '#fff',
      dragBgColor: '#fff',
      borderColor: '#fff',
    },
    {
      id: 'cal2',
      name: 'Another Calendar',
      backgroundColor: '#fff',
      dragBgColor: '#fff',
      borderColor: '#fff',
    },
  ];
  const initialEvents = [
    {
      id: '1',
      calendarId: 'cal1',
      title: '200,000',
      category: 'milestone',
      isVisible: true,
      start: '2022-08-08',
      end: '2022-08-08',
    },
    {
      id: '2',
      calendarId: 'cal1',
      title: '100,000',
      category: 'task',
      isVisible: true,
      start: '2022-08-08',
      end: '2022-08-08',
    },
    {
      id: '3',
      calendarId: 'cal1',
      title: '100,000',
      category: 'allday',
      isVisible: true,
      start: '2022-08-08',
      end: '2022-08-08T13:30',
    },
    {
      id: '4',
      calendarId: 'cal2',
      title: '1,000',
      category: 'milestone',
      start: '2022-08-28',
      end: '2022-08-28',
      isVisible: true,
    },
    {
      id: '5',
      calendarId: 'cal2',
      title: '2,000',
      category: 'allday',
      start: '2022-08-28',
      end: '2022-08-28',
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
  const onAfterRenderEvent = (event: any) => {
    console.log(event);
  };
  const template = {
    /* 수입 */
    allday(event: any) {
      return `<p style="color: blue; font-size: 2px;">${event.title}</p>`;
    },
    /* 지출 */
    milestone(event: any) {
      return `<p style="color: red; font-size: 2px;">${event.title}</p>`;
    },
    /* 합계 */
    task(event: any) {
      return `<p style="color: black; font-size: 2px;">${event.title}</p>`;
    },
  };
  const calendarRef = useRef<any>(null);
  const [calendar, setCalendar] = useState();

  useEffect(() => {
    if (calendarRef.current) {
      setCalendar(calendarRef.current.getInstance());
    }
  });

  const prev = (calendar: any) => {
    calendar.prev();
  };

  const next = (calendar: any) => {
    calendar.next();
  };

  return (
    <CalendarWrapper>
      <button onClick={() => prev(calendar)}>Go prev!</button>
      <button onClick={() => next(calendar)}>Go next!</button>
      <Calendar
        height="650px"
        view="month"
        month={{
          isAlways6Weeks: false,
          visibleEventCount: 3,
          dayNames: ['일', '월', '화', '수', '목', '금', '토'],
        }}
        calendars={calendars}
        events={initialEvents}
        useDetailPopup={true}
        onAfterRenderEvent={onAfterRenderEvent}
        template={template}
        ref={calendarRef}
      />
    </CalendarWrapper>
  );
};
export default AccountBookCalendar;

const CalendarWrapper = styled.div`
  width: 100%;
`;
