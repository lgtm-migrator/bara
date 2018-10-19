import {StreamEventPayload, BaraStreamEmitter} from '../stream';

export const mockStreamOptions = (name: string, max: number = 5) => ({
  id: `org.barajs.stream.${name.toLowerCase()}`,
  name: `Stream ${name}`,
  methods: {
    init: (emit: BaraStreamEmitter) => {
      let counter = 0;
      const interval = setInterval(() => {
        if (counter < max) {
          counter += 1;
          emit(`${name.toLowerCase()}_${counter}`, counter);
        } else {
          clearInterval(interval);
        }
      }, 100);
    },
    onEvent: ({eventType, payload}: StreamEventPayload) => {
      console.log(`Stream event: ${eventType} = ${payload}`);
    },
  },
});

export const mockEventOptions = (name: string, streamIds: string[] = []) => ({
  streamIds,
  id: `org.barajs.event.${name.toLowerCase()}`,
  name: `Bara Event ${name}`,
});

export const mockTriggerOptions = (
  events: any[],
  conditions: any[] = [],
  actions: [] = [],
) => ({
  events,
  conditions,
  actions
});
