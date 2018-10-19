import * as observe from 'callbag-observe';
import bara from '../bara';
import {createStream, StreamOptions, StreamEventPayload} from '../stream';
import {mockStreamOptions} from '../helpers';

let streamOptions: StreamOptions;
describe('Bara', () => {
  beforeAll(() => {
    streamOptions = {
      id: 'org.barajs.stream.test',
      name: 'test stream',
      methods: {
        init: emit => {
          let counter = 0;
          const max = 5;
          const interval = setInterval(() => {
            if (counter < max) {
              counter += 1;
              emit('count', counter);
            } else {
              clearInterval(interval);
            }
          }, 100);
        },
        onEvent: ({eventType, payload}: StreamEventPayload) => {
          console.log(`Stream event: ${eventType} = ${payload}`);
        },
      },
    };
  });

  it('create Bara instance', () => {
    const app = bara();
    expect(app).toHaveProperty('streams');
  });

  it('use Stream in RUNTIME_MODE', () => {
    const app = bara();
    const stream = createStream(streamOptions);
    app.useStream(stream);
    expect(app.getStreams()).toHaveLength(1);
    app.init();
  });

  it('init each Stream in RUNTIME_MODE', done => {
    const handleEvent = jest.fn();
    const app = bara();
    const stream = createStream(mockStreamOptions('counter', 3));
    app.useStream(stream);
    app.init();
    const source = app.getSource();
    observe(handleEvent)(source);
    setTimeout(() => {
      expect(handleEvent).toBeCalledTimes(1);
      done();
    }, 2000);
  });

});
