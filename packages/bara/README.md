# Bara

Bara is a library created for creating any JavaScript application.

## Installation

```
npm install --save bara
```

or

```
yarn add bara
```

## Usage

### Full Application

```javascript
const {
  register,
  useStream,
  useTrigger,
  useEvent,
  useCondition,
  useAction,
} = require('bara');

const ON_TIME_ESLAPSED = 'ON_TIME_ESLAPSED';

const EVERY_X_SECOND = x => triggeringEvent =>
  triggeringEvent.payload % x === 0;
const ONLY_EVEN_SECOND = EVERY_X_SECOND(2);

const timeElapsedStream = {
  name: 'time-elapsed-stream',
  eventTypes: [ON_TIME_ESLAPSED],
  setup: ({emit}) => {
    let elapsed = 0;
    const timer = setInterval(() => {
      emit(ON_TIME_ESLAPSED, elapsed++);
    }, 1000);
  },
};

const tikTrigger = {
  name: 'Tik Every Two Seconds',
  event: useEvent(ON_TIME_ESLAPSED),
  condition: useCondition(ONLY_EVEN_SECOND),
  action: useAction(({payload}) => {
    console.log(`Tik every two seconds: ${payload}`);
  }),
};

const tokTrigger = {
  name: 'Tok Every 5 Seconds',
  event: useEvent(ON_TIME_ESLAPSED),
  condition: useCondition(EVERY_X_SECOND(5)),
  action: useAction(({payload}) => {
    console.log(`Tok every 5 seconds: ${payload}`);
  }),
};

const tikTokApp = () => {
  useStream(timeElapsedStream);
  useTrigger(tikTrigger);
  useTrigger(tokTrigger);
};

register(tikTokApp);
```
