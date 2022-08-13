import { AxiosResponse } from 'axios';

import { useQuery } from 'react-query';
import { authRequest } from '@api/core';

const fetchStatistic = async (date: string) => {
  const [Year, Month] = date.length > 4 ? date.split('-') : [date, ''];
  const { data }: AxiosResponse = await authRequest().get(
    `/statistics?year=${Year}&month=${Month}`
  );

  return data;
};

const useStatistic = (rawDate: string) => {
  const date = rawDate.replace('년', '').replace('월', '').replace(' ', '-');
  const fallback: StatisticResults[] = [];
  const { isLoading, data = fallback } = useQuery(['stastics', date], () =>
    fetchStatistic(date)
  );
  return { isLoading, data };
};

export default useStatistic;
