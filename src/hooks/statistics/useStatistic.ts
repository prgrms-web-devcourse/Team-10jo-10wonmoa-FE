import { AxiosResponse } from 'axios';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { axiosAuthInstance } from '@api/core';
import { dateFormatter } from '@utils/formatter';

const fetchStatistic = async (date: string) => {
  const [Year, Month] = date.length > 4 ? date.split('-') : [date, ''];
  const { data }: AxiosResponse = await axiosAuthInstance.get(
    `/statistics?year=${Year}&month=${Month}`
  );

  return data;
};

// const useStatistic = () => {
//   const [searchParams] = useSearchParams();
//   const date = dateFormatter(
//     searchParams.get('date') || new Date(),
//     'YEAR_DAY_DASH'
//   );
//   const fallback: StatisticResults[] = [];
//   const { isLoading, data = fallback } = useQuery(['stastics', date], () =>
//     fetchStatistic(date)
//   );
//   return { isLoading, data };
// };

const useStatistic = (rawDate: string) => {
  const date = rawDate.replace('년', '').replace('월', '').replace(' ', '-');
  const fallback: StatisticResults[] = [];
  const { isLoading, data = fallback } = useQuery(['stastics', date], () =>
    fetchStatistic(date)
  );
  return { isLoading, data };
};

export default useStatistic;
