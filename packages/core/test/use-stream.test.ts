import {useStreamHook} from '../src/hooks/use-stream';

describe('hooks/use-stream', () => {
  it('throw error when not provide setup function', () => {
    expect(() => {
      useStreamHook({});
    }).toThrow(new Error('Please specify "setup" function in a Bara Stream'));
  });
});
