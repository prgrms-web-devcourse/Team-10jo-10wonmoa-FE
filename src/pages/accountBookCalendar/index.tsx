import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { dateFormatter } from '@utils/formatter';
import { useCalendar } from '@hooks/account';
import { makeCalendarData } from './makeCalendarData';
import Calendar from '@toast-ui/react-calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import { default as toast } from 'react-hot-toast';
import { theme } from '@styles';
const AccountBookCalendar = () => {
  const calendars = [
    {
      id: 'cal1',
      name: 'My Calendar',
      backgroundColor: '#fff',
      dragBgColor: '#fff',
      borderColor: '#fff',
    },
  ];

  const template = {
    /* 수입 */
    allday(event: CalendarEvents) {
      return `<p style="color: ${theme.$blue}; font-weight: 400;">${event.title}</p>`;
    },
    /* 지출 */
    milestone(event: CalendarEvents) {
      return `<p style="color: ${theme.$red}; font-weight: 400;">${event.title}</p>`;
    },
    /* 합계 */
    task(event: CalendarEvents) {
      return `<p style=" font-weight: 400;">${event.title}</p>`;
    },
  };
  // eslint-disable-next-line
  const calendarRef = useRef<any>(null);
  useEffect(() => {
    if (!calendarRef.current) {
      return;
    }
  }, [calendarRef]);

  const prevMonth = () => {
    calendarRef.current.getInstance().prev();
  };

  const nextMonth = () => {
    calendarRef.current.getInstance().next();
  };
  const [searchParams] = useSearchParams();

  const [currentDate, setCurrentDate] = useState(
    dateFormatter(searchParams.get('date') || new Date(), 'YEAR_DAY_DASH')
  );

  useEffect(() => {
    const date = dateFormatter(
      searchParams.get('date') || new Date(),
      'YEAR_DAY_DASH'
    );

    if (!calendarRef.current) {
      return;
    }

    if (date < currentDate) {
      prevMonth();
      setCurrentDate(date);
    } else if (date > currentDate) {
      nextMonth();
      setCurrentDate(date);
    }
  }, [searchParams, calendarRef]);

  const events = [];
  const { isLoading, data } = useCalendar(currentDate);

  if (!isLoading && data !== undefined) {
    events.push(...makeCalendarData(data));
  }

  return (
    <CalendarWrapper>
      <Calendar
        isReadOnly={true}
        height="35rem"
        view="month"
        month={{
          isAlways6Weeks: false,
          visibleEventCount: 5,
          dayNames: ['일', '월', '화', '수', '목', '금', '토'],
        }}
        calendars={calendars}
        events={events}
        onClickEvent={(event) =>
          event.event.title !== ''
            ? toast(`${event.event.title}원 입니다`)
            : null
        }
        template={template}
        ref={calendarRef}
      />
    </CalendarWrapper>
  );
};
export default AccountBookCalendar;

const CalendarWrapper = styled.div`
  width: 100%;
  height: 35rem;
  padding-bottom: 7rem;
  overflow-y: auto;
`;
