# Bara Core

Basic operator of a Bara application.

## Installation

```
yarn add @bara/core

npm i @bara/core
```

## Usage

```javascript
import bara, {useTrigger} from '@bara/core';
import AwesomeTrigger from 'bara-awesome-trigger';

const awesomeApp = () => {
    const [awesomeEvents, awesomeConditions, awesomeActions] = useTrigger(AwesomeTrigger);
    return {
        events: [...awesomeEvents],
        conditions: [...awesomeConditions],
        actions: [...awesomeActions]
    }
}

bara(awesomeApp).run();
```
