const ACCOUNT_TYPE = {
  INCOME: 'INCOME',
  EXPENDITURE: 'EXPENDITURE',
} as const;

declare type SingleAccount = {
  id: string;
  type: typeof ACCOUNT_TYPE[keyof typeof ACCOUNT_TYPE];
  registerDate: string;
  amount: number;
  content: string;
  categoryName: string;
};

declare interface DailyAccountBook {
  currentPage: number;
  nextPage: number;
  results: DailyAccount[];
}

declare interface DailyAccount {
  dayDetails: SingleAccount[];
  dayExpenditure: number;
  dayIncome: number;
  registerDate: string;
}
