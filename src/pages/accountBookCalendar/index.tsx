import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { dateFormatter } from '@utils/formatter';
import { useCalendar } from '@hooks/account';
import { makeCalendarData } from './makeCalendarData';
import Calendar from '@toast-ui/react-calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import { Dummy } from './DummyData';
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

  const onAfterRenderEvent = (event: any) => {
    console.log(event);
  };

  const template = {
    /* 수입 */
    allday(event: any) {
      return `<p style="color: #228be6; font-size: 2px;">${event.title}</p>`;
    },
    /* 지출 */
    milestone(event: any) {
      return `<p style="color: #D81921; font-size: 2px;">${event.title}</p>`;
    },
    /* 합계 */
    task(event: any) {
      return `<p style="font-size: 2px;">${event.title}</p>`;
    },
  };
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
  const [apiData, setAPIData] = useState<CalendarAccount[] | null>(null);
  const [Events, setEvents] = useState<CalendarEvents[] | null>(null);
  const { isLoading, data } = useCalendar(currentDate);

  useEffect(() => {
    if (!isLoading) {
      setAPIData(data);
    }
    if (apiData !== null) {
      setEvents(makeCalendarData(apiData));
    }
  }, [data, apiData]);
  if (Events !== null) console.log(Events);
  return (
    <CalendarWrapper>
      <Calendar
        height="650px"
        view="month"
        month={{
          isAlways6Weeks: false,
          visibleEventCount: 3,
          dayNames: ['일', '월', '화', '수', '목', '금', '토'],
        }}
        calendars={calendars}
        events={Dummy}
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
