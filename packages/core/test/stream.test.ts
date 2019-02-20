import {createStream} from '../src/stream';

let stream = null;

export const config = {
  id: 'org.barajs.stream.file',
  name: 'Stream File',
};

describe('BaraStream', () => {
  it('initialized the bara stream', () => {
    const initMock = jest.fn();
    stream = createStream({
      ...config,
      methods: {
        init: initMock,
        onEvent: () => {},
      },
    });

    expect(stream).toHaveProperty('initialized', false);
    stream.init();
    expect(stream).toHaveProperty('initialized', true);
    expect(initMock).toBeCalled();
    expect(stream).toHaveProperty('name', config.name);
  });

  it('call the onEvent method when new event emitted', (done) => {
    const onEventMock = jest.fn();
    stream = createStream({
      ...config,
      methods: {
        init: (emit) => {
          let counter = 0;
          const max = 5;
          const interval = setInterval(() => {
            if (counter < max) {
              counter += 1;
              emit('count', counter);
            } else {
              clearInterval(interval);
              expect(onEventMock.mock.calls.length).toEqual(5);
              expect(onEventMock.mock.calls[0][0]).toEqual({eventType: 'count', payload: 1});
              expect(onEventMock.mock.calls[4][0]).toEqual({eventType: 'count', payload: 5});
              done();
            }
          }, 100);
        },
        onEvent: onEventMock,
      },
    }).init();
  });
});
