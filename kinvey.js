import Promise from 'es6-promise';
import { isDefined, KinveyError, User } from 'kinvey-js-sdk';
import { Client } from './client';

export function init(config) {
  if (!isDefined(config.appKey)) {
    throw new KinveyError(
      'No App Key was provided.' +
        ' Unable to create a new Client without an App Key.'
    );
  }

  if (!isDefined(config.appSecret) && !isDefined(config.masterSecret)) {
    throw new KinveyError(
      'No App Secret or Master Secret was provided.' +
        ' Unable to create a new Client without an App Secret.'
    );
  }

  return Client.init(config);
}

export function initialize(config) {
  const client = init(config);
  return Promise.resolve(User.getActiveUser(client));
}
