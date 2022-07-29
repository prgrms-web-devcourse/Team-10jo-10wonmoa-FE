class User {
  email: string;
  password: string;
  passwordConfirm: string;
  username: string;

  constructor() {
    this.email = '';
    this.password = '';
    this.username = '';
    this.passwordConfirm = '';
  }
}

export default User;
