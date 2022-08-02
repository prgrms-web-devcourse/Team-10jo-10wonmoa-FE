import LocalStorage from './storage';

const TOKENS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
} as const;

class TokenStorage extends LocalStorage {
  static instance: TokenStorage;
  constructor() {
    super();
    if (TokenStorage.instance) {
      return TokenStorage.instance;
    }
    TokenStorage.instance = this;
  }

  getAccessToken() {
    return this.get(TOKENS.ACCESS_TOKEN);
  }

  setAccessToken(token: string) {
    this.set(TOKENS.ACCESS_TOKEN, token);
  }

  removeAccessToken() {
    this.clear(TOKENS.ACCESS_TOKEN);
  }

  getRefreshToken() {
    return this.get(TOKENS.REFRESH_TOKEN);
  }

  setRefreshToken(token: string) {
    this.set(TOKENS.REFRESH_TOKEN, token);
  }

  removeRefreshToken() {
    this.clear(TOKENS.REFRESH_TOKEN);
  }

  clearTokens() {
    this.removeAccessToken();
    this.removeRefreshToken();
  }
}

const tokenStorage = new TokenStorage();

export default tokenStorage;
