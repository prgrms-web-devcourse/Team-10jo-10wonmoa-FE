import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import axiosInstance from '@api/core';
import { queryKeys } from '@api/react-query/constant';

const fetchAccountBookMonthSum = async (
  date: string
): Promise<AccountBookSum> => {
  const { data }: AxiosResponse<AccountBookSum> = await axiosInstance.get(
    `/account-book/sum/${date}`
  );
  console.log(data);
  return data;
};

const useAccountBookSum = () => {
  const fallback = {
    incomeSum: 0,
    expenditureSum: 0,
    totalSum: 0,
  };

  const { data = fallback } = useQuery([queryKeys.accountBook.sum], () =>
    fetchAccountBookMonthSum('2022-08-01')
  );
  return { data };
};

export default useAccountBookSum;
