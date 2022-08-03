import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import axiosInstance from '@api/core';
import { queryKeys } from '@api/react-query/constant';

const pageParams = {
  page: 1,
  size: 10,
};

const fetchAccountBook = async (date: string): Promise<DailyAccountBook> => {
  const { data }: AxiosResponse<DailyAccountBook> = await axiosInstance.get(
    `/account-book/daily/${date}`,
    {
      params: pageParams,
    }
  );
  return data;
};

const useDailyAccount = () => {
  const fallback = {
    currentPage: 1,
    nextPage: null,
    results: null,
  };
  const { data: dailyResult = fallback, isLoading } = useQuery(
    [queryKeys.accountBook.daily],
    () => fetchAccountBook('2022-08-01')
  );

  return { dailyResult: dailyResult, isLoading };
};

export default useDailyAccount;
