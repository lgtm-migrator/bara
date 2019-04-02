import xs from 'xstream';
import {BaraStreamConfig, SetupCallbacks} from '../model/stream';

function validateStreamConfig<T>(streamConfig: BaraStreamConfig<T>) {
  if (!('setup' in streamConfig)) {
    throw new Error(`Please specify "setup" function in a Bara Stream`);
  }
}

export function useStreamHook<T>(streamConfig: BaraStreamConfig<T>) {
  validateStreamConfig(streamConfig);
  const $ = xs.create({
    start: listener => {
      const emit = (eventType: string, payload: T) => {
        listener.next({eventType, payload});
      };
      streamConfig.setup({emit});
    },
    stop: () => {},
  });
  return {$};
}
