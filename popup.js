import { EventEmitter } from 'events';
import { Linking } from 'react-native';
import bind from 'lodash/bind';

export default class Popup extends EventEmitter {
  _open = false;

  open(uri = '/') {
    const loadStopCallback = event => {
      this.emit('loadstop', event);
    };

    const eventListeners = {
      loadStopCallback: bind(loadStopCallback, this)
    };

    if (this._open === false) {
      Linking.addEventListener('url', eventListeners.loadStopCallback);
      Linking.openURL(uri).catch(err =>
        console.error('An error occurred', err)
      );
    }

    return this;
  }

  close() {
    if (this._open) {
      this._open = false;
      Linking.removeEventListener('url', this._handleOpenURL);
    }

    return this;
  }
}
