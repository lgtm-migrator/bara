import {register, useStream} from '../src/bara';

describe('main bara application', () => {
  beforeAll(() => {
    register(() => {
      const registry = useStream({
        setup: ({emit}) => {
          console.log('Registered stream!');
        },
      });
      console.log(registry);
    });
  });
  it('run bara application', () => {
    expect(true).toBeTruthy();
  });
});
