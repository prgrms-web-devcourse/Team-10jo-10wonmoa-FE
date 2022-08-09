import { AxiosResponse } from 'axios';
import { useSearchParams } from 'react-router-dom';
import { useInfiniteQuery } from 'react-query';
import axiosInstance from '@api/core';
import { queryKeys } from '@api/react-query/constant';
import { dateFormatter } from '@utils/formatter';

const fetchAccountBook = async (
  date: string,
  pageParam: number
): Promise<DailyAccountBook> => {
  const { data }: AxiosResponse<DailyAccountBook> = await axiosInstance.get(
    `/account-book/daily/${date}-01`,
    {
      params: {
        size: 1,
        page: pageParam,
      },
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

  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery(
    [queryKeys.accountBook.daily, date],
    ({ pageParam = 1 }) => fetchAccountBook(date, pageParam),
    { getNextPageParam: (lastPage) => lastPage.nextPage || undefined }
  );

  return {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
  };
};

export default useAccountBookDaily;
