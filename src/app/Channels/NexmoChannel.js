import { Channel } from '@nsilly/notification';

export const NEXMO_SMS = 'NEXMO_SMS';

export default class NexmoChannel extends Channel {
  constructor(credentials) {
    super();
    this.name = NEXMO_SMS;
    this._credentials = credentials || {
      apiKey: process.env.NEXMO_API_KEY,
      apiSecret: process.env.NEXMO_API_SECRET
    };
  }

  async execute(notification) {
    const result = await notification.toNexmo(notification.notifiable).setCredentials(this._credentials).send();
    return result;
  }
}
