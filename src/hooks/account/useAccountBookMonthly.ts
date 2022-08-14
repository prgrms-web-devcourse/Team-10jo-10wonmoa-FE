import { AxiosResponse } from 'axios';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { authRequest } from '@api/core';
import { queryKeys } from '@api/react-query/constant';
import { dateFormatter } from '@utils/formatter';

const fetchAccountMonthly = async (date: string) => {
  const formattedDate = dateFormatter(date, 'YEAR');
  const { data }: AxiosResponse<{ results: MonthlyAccount[] }> =
    await authRequest().get(`/account-book/month/${formattedDate}`);
  return data.results;
};

const useAccountBookMonthly = () => {
  const [searchParams] = useSearchParams();
  const date = dateFormatter(
    searchParams.get('date') || new Date(),
    'YEAR_DAY_DASH'
  );

  const fallback: MonthlyAccount[] = [];
  const { data = fallback, isLoading } = useQuery(
    [queryKeys.accountBook.monthly, date],
    () => fetchAccountMonthly(date)
  );

  const isEmpty = !isLoading && data.length === 0;

  return {
    data,
    isLoading,
    isEmpty,
  };
};

export default useAccountBookMonthly;
