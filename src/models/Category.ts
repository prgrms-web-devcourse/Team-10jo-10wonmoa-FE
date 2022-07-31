export type CategoryType = 'income' | 'expenditure';

export type Category = {
  id: string;
  name: string;
  categoryType: CategoryType;
};
