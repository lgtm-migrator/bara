import {useStreamHook} from './hooks/use-stream';
import {BaraStreamConfig} from './model/stream';

const bara = (() => {
  const streamRegistry: any[] = [];
  const streamRegistryIndex = 0;
  return {
    register(app: () => void) {
      app();
    },
    useStream<T>(streamConfig: BaraStreamConfig<T>) {
      streamRegistry[streamRegistryIndex] =
        streamRegistry[streamRegistryIndex] ||
        (useStreamHook(streamConfig) as any);
      return streamRegistry;
    },
    useTrigger(triggerConfig: any) {
      console.log(`registering trigger: ${triggerConfig}`);
    },
  };
})();

const {register, useStream} = bara;

export {register, useStream};
