import * as _ from 'lodash';
import Nexmo from 'nexmo';
import { Exception } from '@nsilly/exceptions';

export default class NexmoClient {
  constructor() {
    this._to = undefined;
    this._content = undefined;
    this._credentials = undefined;
    this._from = process.env.NEXMO_SENDER_NUMBER;
    this._override_from_number = false;
  }

  setCredentials(credentials) {
    if (credentials.apiKey === undefined || credentials.apiSecret === undefined) {
      throw new Exception('Credential does not correct');
    }
    if (credentials.defaultSenderNumber !== undefined && this._override_from_number === false) {
      this._from = credentials.credentials.defaultSenderNumber;
    }
    this._credentials = _.omit(credentials, ['defaultSenderNumber']);
    return this;
  }

  from(number) {
    this._from = number;
    this._override_from_number = true;
    return this;
  }

  to(to) {
    if (_.isNil(to)) {
      throw new Exception("receiver's phone number is required");
    }
    this._to = to;
    return this;
  }

  content(content = '') {
    this._content = content;
    return this;
  }

  send() {
    const nexmo = new Nexmo(this._credentials);
    return new Promise((resolve, reject) => {
      nexmo.message.sendSms(this._from, this._to, this._content, (err, response) => {
        if (err) {
          reject(err);
        } else {
          if (Array.isArray(response.messages) && response.messages.length > 0 && response.messages[0].status === '0') {
            resolve({ sent: true, payload: response });
          } else {
            if (Array.isArray(response.messages) && response.messages.length > 0 && response.messages[0]['error-text'] !== undefined) {
              reject(new Exception(`Message failed with error: ${response.messages[0]['error-text']}`));
            } else {
              reject(new Exception('[Nexmo] unknow error'));
            }
          }
        }
      });
    });
  }
}
