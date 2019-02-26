import {BaraStream, createStream, createStreamAction} from '../src/stream';

let stream: BaraStream<number>;

export const config = {
  id: 'org.barajs.stream.tik',
  name: 'Stream File',
};

const actions = [createStreamAction<number>('INCREASE')];

describe('BaraStream', () => {
  it('initialized the bara stream', done => {
    jest.setTimeout(10000);
    const started = jest.fn();
    stream = createStream<number>({
      ...config,
      actions,
      producer: {
        start(listener) {
          console.log('meo');
          this.id = setInterval(() => listener.next(1), 1000) as unknown;
        },
        stop() {
          clearInterval(this.id as number);
        },
        id: 0,
      },
    });

    stream.init();
    setTimeout(() => {
      done();
    }, 4000);
  });
});
