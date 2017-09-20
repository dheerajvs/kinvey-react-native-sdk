import { CacheMiddleware } from 'kinvey-js-sdk/dist/export';
import Storage from './storage';

/* eslint class-methods-use-this:0 */
// Disabling eslint warning as we cannot change the middleware contract
export default class ReactNativeCacheMiddleware extends CacheMiddleware {
  loadStorage(name) {
    return new Storage(name);
  }
}
