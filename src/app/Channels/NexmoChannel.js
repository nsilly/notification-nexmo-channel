import { Channel } from '@nsilly/notification';

export const NEXMO_SMS = 'NEXMO_SMS';

export default class NexmoChannel extends Channel {
  constructor() {
    super();
    this.name = NEXMO_SMS;
  }

  async execute(notification) {
    const result = await notification.toNexmo(notification.notifiable).send();
    return result;
  }
}
