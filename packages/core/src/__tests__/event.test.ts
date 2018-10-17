import {createEvent, BaraEventOptions} from '../event';
import {createStream} from '../stream';

let config: BaraEventOptions;

describe('BaraEvent', () => {
  beforeAll(() => {
    config = {
      id: 'org.barajs.event.file',
      name: 'Event File',
      streamIds: ['org.barajs.stream.file', 'org.barajs.stream.websocket'],
    };
  });

  it('create an event', () => {
    const event = createEvent(config);
    expect(event.id).toEqual(config.id);
    expect(event.name).toEqual(config.name);
  });

  it('connect to a list of filtered streams', () => {
    const event = createEvent(config);
    expect(event.getStreams()).toHaveLength(0);
    const sampleMethods = {
      init: () => {},
      onEvent: () => {},
    };
    const streams = [
      createStream({
        id: 'org.barajs.stream.file',
        name: 'Stream File',
        methods: sampleMethods,
      }),
      createStream({
        id: 'org.barajs.stream.ipfs',
        name: 'Stream IPFS',
        methods: sampleMethods,
      }),
      createStream({
        id: 'org.barajs.stream.websocket',
        name: 'Stream Websocket',
        methods: sampleMethods,
      }),
    ];
    event.connect(streams);
    expect(event.getStreams()).toHaveLength(2);
  });
});
