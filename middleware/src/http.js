import {
  Middleware,
  NetworkConnectionError,
  TimeoutError,
  isDefined
} from 'kinvey-js-sdk/dist/export';
import { Platform } from 'react-native';
import xhr from 'xhr'; // TODO: Replace with axios
import Promise from 'es6-promise';
import pkg from '../../../package.json';

function deviceInformation() {
  const parts = [`js-${pkg.name}/${pkg.version}`];

  return parts
    .concat([Platform.OS, Platform.Version])
    .map(part =>
      part
        .toString()
        .replace(/\s/g, '_')
        .toLowerCase()
    )
    .join(' ');
}

export default class HttpMiddleware extends Middleware {
  constructor(name = 'Http Middleware') {
    super(name);
  }

  handle(request) {
    const promise = new Promise((resolve, reject) => {
      const { url, method, headers, body, timeout, followRedirect } = request;

      headers['X-Kinvey-Device-Information'] = deviceInformation();

      this.xhrRequest = xhr(
        {
          method,
          url,
          headers,
          body,
          followRedirect,
          timeout
        },
        (error, response, data) => {
          if (isDefined(error)) {
            if (
              error.code === 'ESOCKETTIMEDOUT' ||
              error.code === 'ETIMEDOUT'
            ) {
              return reject(new TimeoutError('The network request timed out.'));
            }

            return reject(
              new NetworkConnectionError(
                'There was an error connecting to the network.',
                error
              )
            );
          }

          return resolve({
            response: {
              statusCode: response.statusCode,
              headers: response.headers,
              data
            }
          });
        }
      );
    });
    return promise;
  }

  cancel() {
    if (
      isDefined(this.xhrRequest) &&
      typeof this.xhrRequest.abort === 'function'
    ) {
      this.xhrRequest.abort();
    }

    return Promise.resolve();
  }
}
