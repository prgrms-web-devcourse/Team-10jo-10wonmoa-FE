export type TotalBudgetList = {
  registerDate: string;
  amount: number;
  expenditure: number;
  percent: number;
  budgets: Budget[];
};

export type Budget = {
  id: number;
  percent: number;
  categoryName: string;
  amount: number;
  expenditure: number;
};
