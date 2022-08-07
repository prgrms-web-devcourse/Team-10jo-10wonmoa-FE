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
