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
    NotificationService.register([new NexmoChannel({apiKey: YOUR_API_KEY, apiSecret: YOUR_API_SECRET})]);
  }
}

```

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
    return msg;
  }
}
```
