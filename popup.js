import { EventEmitter } from 'events';
import { Linking } from 'react-native';
import bind from 'lodash/bind';

export default class Popup extends EventEmitter {
  _open = false;

  _loadStopCallback = event => {
    this.emit('loadstop', event);
  };

  _eventListeners = {
    loadStopCallback: bind(this._loadStopCallback, this)
  };

  open(uri = '/') {
    if (this._open === false) {
      Linking.addEventListener('url', this._eventListeners.loadStopCallback);
      Linking.openURL(uri).catch(err =>
        console.error('An error occurred', err)
      );
    }

    return this;
  }

  close() {
    if (this._open) {
      this._open = false;
      Linking.removeEventListener('url', this._eventListeners.loadStopCallback);
    }

    return this;
  }
}
