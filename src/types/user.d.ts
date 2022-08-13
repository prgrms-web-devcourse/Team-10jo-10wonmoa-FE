declare type User = {
  email: string;
  username: string;
  password: string;
};

declare type SignUpUser = User & {
  passwordConfirm: string;
};

declare type LoginUser = Pick<User, 'email' | 'password'>;

declare type Token = {
  accessToken: string;
  refreshToken: string;
};
