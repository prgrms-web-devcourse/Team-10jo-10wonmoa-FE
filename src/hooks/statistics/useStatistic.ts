import { AxiosResponse } from 'axios';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import axiosInstance from '@api/core';
import { queryKeys } from '@api/react-query/constant';
import { dateFormatter } from '@utils/formatter';

const fetchStatistic = async (date: string) => {
  const [Year, Month] = date.split('-');

  const data: AxiosResponse<StatisticResults[]> = await axiosInstance.get(
    `/statistics?year=${Year}&month=${Month}`
  );

  return data;
};

const useStatistic = async () => {
  const [searchParams] = useSearchParams();
  const date = dateFormatter(
    searchParams.get('date') || new Date(),
    'YEAR_DAY_DASH'
  );
  const fallback: StatisticResults[] = [];
  const { data = fallback } = useQuery(['stastics', date], () =>
    fetchStatistic(date)
  );

  return {
    data,
  };
};

export default useStatistic;
