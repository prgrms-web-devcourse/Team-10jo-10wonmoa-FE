export type CategoryType = 'income' | 'expenditure';

export type Category = {
  id: number;
  name: string;
  categoryType: CategoryType;
};
