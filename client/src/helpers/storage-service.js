import * as localForage from "localforage";

class StorageService {
  constructor() {
    this.store = null;
  }

  init() {
    this.store = localForage.createInstance({
      name: "cakebake"
    });
  }

  async saveItem(key, value) {
    const savedValue = await this.store.setItem(key, value);
    return savedValue;
  }

  async getItem(key) {
    const value = await this.store.getItem(key);
    return value;
  }

  removeItem(key) {
    this.store.removeItem(key);
  }
}
const storage = new StorageService();

export default storage;
