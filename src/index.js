import { CacheRack, NetworkRack, MobileIdentityConnect } from 'kinvey-js-sdk';
import * as Kinvey from 'kinvey-js-sdk';
import { CacheMiddleware, HttpMiddleware } from './middleware';
import Popup from './popup';

// Setup racks
CacheRack.useCacheMiddleware(new CacheMiddleware());
NetworkRack.useHttpMiddleware(new HttpMiddleware());

// Setup popup
MobileIdentityConnect.usePopupClass(Popup);

// Export
module.exports = Kinvey;
