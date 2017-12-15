import { isDefined, Storage as CoreStorage } from 'kinvey-js-sdk';
import { AsyncStorageAdapter } from './asyncstorage';

export default class Storage extends CoreStorage {
  loadAdapter() {
    return AsyncStorageAdapter.load(this.name).then(adapter => {
      if (isDefined(adapter) === false) {
        return super.loadAdapter();
      }

      return adapter;
    });
  }
}
