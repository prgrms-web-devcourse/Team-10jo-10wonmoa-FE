const ACCOUNT_TYPE = {
  INCOME: 'INCOME',
  EXPENDITURE: 'EXPENDITURE',
} as const;

declare type SingleAccount = {
  id: string;
  type: typeof ACCOUNT_TYPE[keyof typeof ACCOUNT_TYPE];
  registerTime: string;
  amount: number;
  content: string;
  categoryName: string;
};

declare type DailyAccountBook = {
  currentPage: number;
  nextPage: number | null;
  results: DailyAccount[];
};

type DailySum = {
  registerDate: string;
  dayIncome: number;
  dayExpenditure: number;
};

declare type DailyAccount = AccountBookSum & {
  registerDate: string;
  dayDetails: SingleAccount[];
};

declare type AccountBookSum = {
  incomeSum: number;
  expenditureSum: number;
  totalSum: number;
};

declare type MonthlyAccount = {
  incomeSum: number;
  expenditureSum: number;
  totalSum: number;
  month: number;
};

declare type StatisticIncome = {
  name: string;
  total: number;
  percent: number;
};

declare type StatisticResults = {
  year: number;
  month: number | null;
  incomeTotalSum: number;
  expenditureTotalSum: number;
  incomes: StatisticIncome[];
  expenditures: StatisticIncome[];
};
