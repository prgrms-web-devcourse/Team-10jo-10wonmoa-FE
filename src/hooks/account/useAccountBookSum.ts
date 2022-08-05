import { AxiosResponse } from 'axios';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import axiosInstance from '@api/core';
import { queryKeys } from '@api/react-query/constant';
import { dateFormatter } from '@utils/formatter';

const fetchAccountBookMonthSum = async (
  date: string
): Promise<AccountBookSum> => {
  const { data }: AxiosResponse<AccountBookSum> = await axiosInstance.get(
    `/account-book/sum/${date}-01`
  );
  console.log(data);
  return data;
};

const useAccountBookSum = () => {
  const [searchParams] = useSearchParams();
  const date = dateFormatter(
    searchParams.get('date') || new Date(),
    'YEAR_DAY_DASH'
  );

  const fallback = {
    incomeSum: 0,
    expenditureSum: 0,
    totalSum: 0,
  };

  const { data = fallback } = useQuery([queryKeys.accountBook.sum, date], () =>
    fetchAccountBookMonthSum(date)
  );
  return { data };
};

export default useAccountBookSum;
