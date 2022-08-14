import { authRequest } from '@api/core';
import type { TotalBudgetList, BudgetItemToEdit } from '../types/budget';

export const fetchGetBudgetList = (date: string) =>
  authRequest().get<BudgetItemToEdit>(`/budgets?registerDate=${date}`);

export const fetchGetMonthlyBudgetList = ({
  year,
  month,
}: {
  year: string;
  month?: string;
}) =>
  authRequest().get<TotalBudgetList>('/budgets/statistics', {
    params: { year, month },
  });

export const fetchPutBudgetItem = (
  registerDate: string,
  userCategoryId: number,
  amount: number
) =>
  authRequest().put('/budgets', {
    registerDate,
    userCategoryId,
    amount,
  });
