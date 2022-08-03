import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import axiosInstance from '@api/core';
import { queryKeys } from '@api/react-query/constant';

const ACCOUNT_TYPE = {
  INCOME: 'INCOME',
  EXPENDITURE: 'EXPENDITURE',
} as const;

export type SingleAccount = {
  id: string;
  type: typeof ACCOUNT_TYPE[keyof typeof ACCOUNT_TYPE];
  registerDate: string;
  amount: number;
  content: string;
  categoryName: string;
};

interface DailyAccountBook {
  currentPage: number;
  nextPage: number;
  results: DailyAccount[];
}

export interface DailyAccount {
  dayDetails: SingleAccount[];
  dayExpenditure: number;
  dayIncome: number;
  registerDate: string;
}

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
