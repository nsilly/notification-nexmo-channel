import * as _ from 'lodash';
import Nexmo from 'nexmo';
import { Exception } from '@nsilly/exceptions';

export default class NexmoClient {
  constructor() {
    this._to = undefined;
    this._content = undefined;
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
    const nexmo = new Nexmo({
      apiKey: process.env.NEXMO_API_KEY,
      apiSecret: process.env.NEXMO_API_SECRET
    });

    return new Promise((resolve, reject) => {
      nexmo.message.sendSms(process.env.NEXMO_SENDER_NUMBER, this._to, this._content, (err, response) => {
        if (err) {
          reject(err);
        } else {
          if (response.messages[0]['status'] === '0') {
            resolve({ sent: true, payload: response });
          } else {
            reject(new Exception(`Message failed with error: ${response.messages[0]['error-text']}`));
          }
        }
      });
    });
  }
}
