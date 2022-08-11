import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import { axiosAuthInstance } from '@api/core';

const fetchCalendar = async (date: string) => {
  const [Year, Month] = date.length > 4 ? date.split('-') : [date, ''];
  const { data }: AxiosResponse<{ results: CalendarAccount[] }> =
    await axiosAuthInstance.get(
      `/account-book/calendar/year=${Year}&month=${Month}`
    );

  return data.results;
};

const useCalendar = (rawDate: string) => {
  const date = rawDate.replace('년', '').replace('월', '').replace(' ', '-');
  const fallback: StatisticResults[] = [];
  const { isLoading, data = fallback } = useQuery(['calendar', date], () =>
    fetchCalendar(date)
  );
  return { isLoading, data };
};

export default useCalendar;
