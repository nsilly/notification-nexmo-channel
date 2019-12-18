# Nsilly Nexmo Notification Channel

- [Nsilly Nexmo Notification Channel](#nsilly-nexmo-notification-channel)
  - [Installation](#installation)
    - [Register nexmo channel](#register-nexmo-channel)
  - [How to use](#how-to-use)


## Installation

Install package from NPM


```
npm install @nsilly/notification-nexmo-channel
```

or

```
yarn add @nsilly/notification-nexmo-channel
```


### Register nexmo channel

Register nexmo channel in `app/Providers/AppServiceProviders.js`

```javascript
import { NotificationService } from '@nsilly/notification';
import { NexmoChannel } from '@nsilly/notification-nexmo-channel';

export default class AppServiceProvider extends ServiceProvider {
  // ...
  boot() {
    // ...
    NotificationService.register([
      new NexmoChannel({
        apiKey: NEXMO_API_KEY,
        apiSecret: NEXMO_API_SECRET,
        applicationId: NEXMO_APP_ID,
        privateKey: NEXMO_PRIVATE_KEY_PATH,
        signatureSecret: NEXMO_SIGNATURE_SECRET,
        signatureMethod: NEXMO_SIGNATURE_METHOD,
        defaultSenderNumber: NEXMO_SENDER_NUMBER,
      }, options)

      // all options available https://github.com/Nexmo/nexmo-node
    ]);
  }
}

```

> By default Nexmo Channel looking for `NEXMO_API_KEY`, `NEXMO_API_SECRET` and `NEXMO_SENDER_NUMBER` environment variable

## How to use

Create your notification that use channel `NEXMO_SMS`

```javascript
import { Notification } from '@nsilly/notification';
import { NexmoClient, NEXMO_SMS } from '@nsilly/notification-nexmo-channel';

export class TestNotification extends Notification {
  via() {
    return [NEXMO_SMS];
  }

  toNexmo(notifiable) {
    const msg = new NexmoClient().to(notifiable.getPhoneNumber()).content('Good morning'));
    // You also can override `NEXMO_SENDER_NUMBER` 
    // const msg = new NexmoClient().from(YOUR_NUMBER).to(notifiable.getPhoneNumber()).content('Good morning'));

    return msg;
  }
}
```
