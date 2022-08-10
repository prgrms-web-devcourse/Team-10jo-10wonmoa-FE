import { AxiosResponse } from 'axios';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { axiosAuthInstance } from '@api/core';
import { dateFormatter } from '@utils/formatter';

const fetchStatistic = async (date: string) => {
  const [Year, Month] = date.split('-');

  const { data }: AxiosResponse = await axiosAuthInstance.get(
    `/statistics?year=${Year}&month=${Month}`
  );

  return data;
};

const useStatistic = () => {
  const [searchParams] = useSearchParams();
  const date = dateFormatter(
    searchParams.get('date') || new Date(),
    'YEAR_DAY_DASH'
  );
  const fallback: StatisticResults[] = [];
  const { isLoading, data = fallback } = useQuery(['stastics', date], () =>
    fetchStatistic(date)
  );
  return { isLoading, data };
};

export default useStatistic;
