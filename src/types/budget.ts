export type TotalBudgetList = {
  registerDate: string;
  amount: number;
  expenditure: number;
  percent: number;
  budgets: Budget[];
};

export interface Budget {
  id: number;
  percent: number;
  categoryName: string;
  amount: number;
  expenditure: number;
}

export type BudgetItemToEdit = {
  budgets: Pick<Budget, 'id' | 'categoryName' | 'amount'>[];
};
