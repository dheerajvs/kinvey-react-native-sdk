import { AsyncStorage } from 'react-native';
import { Client as CoreClient, isDefined } from 'kinvey-js-sdk';

class ActiveUserStorage {
  async get(key) {
    const value = await AsyncStorage.getItem(key);
    return JSON.parse(value);
  }

  async set(key, value) {
    if (isDefined(value)) {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } else {
      await AsyncStorage.removeItem(key);
    }

    return value;
  }
}

export class Client extends CoreClient {
  static init(config) {
    const client = CoreClient.init(config);
    client.activeUserStorage = new ActiveUserStorage();
    return client;
  }
}
