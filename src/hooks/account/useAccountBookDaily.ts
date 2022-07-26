import { AxiosResponse } from 'axios';
import { useSearchParams } from 'react-router-dom';
import { useInfiniteQuery } from 'react-query';
import { authRequest } from '@api/core';
import { queryKeys } from '@api/react-query/constant';
import { dateFormatter } from '@utils/formatter';

const fetchAccountBook = async (
  date: string,
  pageParam: number
): Promise<DailyAccountBook> => {
  const { data }: AxiosResponse<DailyAccountBook> = await authRequest().get(
    `/account-book/daily/${date}-01`,
    {
      params: {
        size: 5,
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

  const pageComputedDatas = data?.pages.flatMap(
    (page: DailyAccountBook) => page.results
  );

  const isEmpty = !isLoading && pageComputedDatas?.length === 0;

  return {
    data,
    computedDatas: pageComputedDatas,
    isLoading,
    isEmpty,
    fetchNextPage,
    hasNextPage,
  };
};

export default useAccountBookDaily;
