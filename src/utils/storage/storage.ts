interface Storage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export default class LocalStorage {
  readonly storage: Storage;

  constructor() {
    this.storage = window.localStorage;
  }

  get(key: string) {
    return this.storage.getItem(key);
  }
  set(key: string, value: string) {
    this.storage.setItem(key, value);
  }
  clear(key: string) {
    this.storage.removeItem(key);
  }
}
