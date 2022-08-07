import { AxiosResponse } from 'axios';
import { useSearchParams } from 'react-router-dom';
import { useQueries } from 'react-query';
import axiosInstance from '@api/core';
import { queryKeys } from '@api/react-query/constant';
import { dateFormatter } from '@utils/formatter';

const fetchAccountBookMonthSum = async (
  date: string
): Promise<AccountBookSum> => {
  const formattedDate = dateFormatter(date, 'YEAR_DAY_DASH') + '-01';

  const { data }: AxiosResponse<AccountBookSum> = await axiosInstance.get(
    `/account-book/sum/month/${formattedDate}`
  );
  return data;
};

const fetchAccountBookYearSum = async (
  date: string
): Promise<AccountBookSum> => {
  const formattedDate = dateFormatter(date || new Date(), 'YEAR');
  const { data }: AxiosResponse<AccountBookSum> = await axiosInstance.get(
    `/account-book/sum/year/${formattedDate}`
  );
  return data;
};

const useAccountBookSum = () => {
  const [searchParams] = useSearchParams();
  const date = searchParams.get('date') || new Date().toString();

  const fallback = {
    incomeSum: 0,
    expenditureSum: 0,
    totalSum: 0,
  };

  const [
    { data: yearSumResult = fallback },
    { data: monthSumResult = fallback },
  ] = useQueries([
    {
      queryKey: [queryKeys.accountBook.sum.year, date],
      queryFn: () => fetchAccountBookYearSum(date),
    },
    {
      queryKey: [queryKeys.accountBook.sum.month, date],
      queryFn: () => fetchAccountBookMonthSum(date),
    },
  ]);

  return { monthSumResult, yearSumResult };
};

export default useAccountBookSum;
