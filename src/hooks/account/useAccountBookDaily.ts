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
    `/account-book/daily/${date}-01`,
    {
      params: pageParams,
    }
  );
  return data;
};

const useAccountBookDaily = (date: string) => {
  const fallback = {
    currentPage: 1,
    nextPage: null,
    results: [],
  };
  const { data = fallback, isLoading } = useQuery(
    [queryKeys.accountBook.daily, date],
    () => fetchAccountBook(date)
  );

  return { data, isLoading };
};

export default useAccountBookDaily;
