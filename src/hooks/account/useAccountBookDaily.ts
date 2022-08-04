import { AxiosResponse } from 'axios';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import axiosInstance from '@api/core';
import { queryKeys } from '@api/react-query/constant';
import { dateFormatter } from '@utils/formatter';

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

const useAccountBookDaily = () => {
  const [searchParams] = useSearchParams();
  const date = dateFormatter(
    searchParams.get('date') || new Date(),
    'YEAR_DAY_DASH'
  );

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
