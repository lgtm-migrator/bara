import {useStreamHook} from './hooks/use-stream';

const bara = (() => {
  const streamRegistry: any[] = [];
  const streamRegistryIndex = 0;
  return {
    register(app: () => void) {
      app();
    },
    useStream(streamConfig: any) {
      streamRegistry[streamRegistryIndex] =
        streamRegistry[streamRegistryIndex] ||
        (useStreamHook(streamConfig) as any);
      return streamRegistry;
    },
  };
})();

const {register, useStream} = bara;

export {register, useStream};
