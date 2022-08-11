import axios from '@api/core';
import type { TotalBudgetList } from '../types/budget';

// export const fetchGetBudgetList = (date: string) =>
//   axios.get(`/budgets?registerDate=${date}`);

export const fetchGetMonthlyBudgetList = (year: string, month: string) =>
  axios.get<TotalBudgetList>(`/budgets`, {
    params: { year: year, month: month },
  });

export const fetchPutBudgetItem = (
  registerDate: string,
  userCategoryId: string,
  amount: string
) =>
  axios.put('/budgets', {
    registerDate,
    userCategoryId,
    amount,
  });
