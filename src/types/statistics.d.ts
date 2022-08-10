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
