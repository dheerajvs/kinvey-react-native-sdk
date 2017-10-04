import { isDefined } from "kinvey-js-sdk/dist/export";
import { Storage as CoreStorage } from "kinvey-js-sdk/dist/request/src/middleware/src/storage";
import { RealmAdapter } from "./realm";

export default class Storage extends CoreStorage {
  loadAdapter() {
    return RealmAdapter.load(this.name).then(adapter => {
      if (isDefined(adapter) === false) {
        return super.loadAdapter();
      }

      return adapter;
    });
  }
}
