# Bara

Bara is a library created for creating any (front/back/cli) JavaScript application.

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
  createEventType
} = require('bara')

const ON_TIME_ESLAPSED = createEventType('ON_TIME_ESLAPSED')

const EVERY_X_SECOND = x => second => second % x === 0
const ONLY_EVEN_SECOND = EVERY_X_SECOND(2)

const app = () => {
  // Register source stream factory for Bara application
  useStream(({setName, addEventType, emit}) => {
    setName('dev.barajs.timer')

    let elapsed = 0;
    const timer = setInterval(() => {
        emit(ON_TIME_ESLAPSED, elapsed++);
    }, 1000);

    return () => {
        // Cleanup when zero listener
        clearInterval(timer)
    }
  })

  // Register a trigger that will be triggered every even second
  useTrigger(() => {
    const event = useEvent(ON_TIME_ESLAPSED)
    const condition = useCondition(ONLY_EVEN_SECOND)
    const action = useAction((second) => {
      console.log(`Tik every even seconds: ${second}`)
    })

    return {event, condition, action}
  })

  // Register a trigger that will be triggered every 5 second
  useTrigger(() => {
    const every = 5
    const event = useEvent(ON_TIME_ELAPSED)
    const condition = useCondition(EVERY_X_SECOND(every))
    const action = useAction((second) => {
      console.log(`Tik every `${every}` seconds: ${second}`)
    })

    return {event, condition, action}
  })
}

register(app);
```
