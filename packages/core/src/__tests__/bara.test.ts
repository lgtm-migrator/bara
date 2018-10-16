import * as R from 'ramda';
import bara from '../bara';
import {createStream, BaraStream, StreamOptions, StreamEventPayload} from '../stream';

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
          console.log(`Stream event: ${eventType} = ${payload}`)
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

  it('init each Stream in RUNTIME_MODE', () => {
    const app = bara();
    const stream = createStream(streamOptions);
    app.useStream(stream);
    app.init();
    const streams = app.getStreams();
    R.forEach((stream: BaraStream) => {
      expect(stream).toHaveProperty('initialized', true);
    })(streams)
  })
});
