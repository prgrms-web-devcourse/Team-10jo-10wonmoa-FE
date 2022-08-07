export interface NewUser {
  email: string;
  username: string;
  password: string;
  passwordConfirm: string;
}

export type LoginUser = Pick<NewUser, 'email' | 'password'>;

export type Token = {
  accessToken: string;
  refreshToken: string;
};

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
