export type TabItem = { value: string; title: string };
export type Tabs = Array<TabItem>;

export type ErrorHandler = (error: unknown) => void;
export type CategoryType = 'income' | 'expenditure';

export type Category = {
  id: number;
  name: string;
  categoryType: CategoryType;
};

export interface CreateAccountRequest {
  registerDate: string;
  amount: number;
  userCategoryId: number;
  content?: string;
}

export interface AccountDetailResponse extends CreateAccountRequest {
  categoryName: string;
}

export interface CreateSearchRequest {
  content?: string;
  categories?: number[];
  minprice?: number;
  maxprice?: number;
  categoryNames?: string;
  start?: string;
  end?: string;
}

export interface CreateCategoryRequest {
  categoryType: string;
  name: string;
}

export interface UpdateCategoryRequest {
  categoryId: number;
  name: string;
}
