import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import { axiosAuthInstance } from '@api/core';

const fetchCalendar = async (date: string) => {
  const [Year, Month] = date.split('-');
  const { data }: AxiosResponse<{ results: CalendarAccount[] }> =
    await axiosAuthInstance.get(
      `/account-book/calendar?year=${Year}&month=${Month}`
    );

  return data.results;
};

const useCalendar = (date: string) => {
  const fallback: CalendarAccount[] = [];
  const { isLoading, data = fallback } = useQuery(['calendar', date], () =>
    fetchCalendar(date)
  );
  return { isLoading, data };
};

export default useCalendar;
