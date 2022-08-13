import { axiosAuthInstance } from '@api/core';
import type { TotalBudgetList, BudgetItemToEdit } from '../types/budget';

export const fetchGetBudgetList = (date: string) =>
  axiosAuthInstance.get<BudgetItemToEdit>(`/budgets?registerDate=${date}`);

export const fetchGetMonthlyBudgetList = (year: string, month: string) =>
  axiosAuthInstance.get<TotalBudgetList>(
    `/budgets/statistics?year=${year}&month=${month}`
  );

export const fetchPutBudgetItem = (
  registerDate: string,
  userCategoryId: number,
  amount: number
) =>
  axiosAuthInstance.put('/budgets', {
    registerDate,
    userCategoryId,
    amount,
  });
