import xs, {Listener, Producer, Stream} from 'xstream';

export interface Event<T> {
  name: string;
  streams?: Array<Stream<T>>;
}

interface AddListenerFunc<T> {
  (listener: Listener<T>): void;
}

interface EventHook<T> extends Array<Stream<T>|AddListenerFunc<T>> {
  0: Stream<T>;
  1: AddListenerFunc<T>;
}

interface StreamSetupFunc<T> {
  (listener: Listener<T>): void;
}

interface StreamControllerFunc<T> {
  (listener: Listener<T>): void;
}

let useStreamIndex = 0;
const useStreamHooks = [];
const streams = [];

function registerStreamHook<T>(
    index: number,
    setup: StreamSetupFunc<T>,
    ): EventHook<T> {
  if (!useStreamHooks![index]) {
    const stream = xs.create<T>({
      start: setup,
      stop: () => {},
    });
    (useStreamHooks as Array<EventHook<T>>)!.push([
      stream,
      (listener: Listener<T>) => {
        stream.addListener(listener);
      },
    ]);
  }
  return useStreamHooks[index];
}

export function useStream<T>(
    name: string,
    setup: (listener: Listener<T>) => void,
) {
  const hook = registerStreamHook(useStreamIndex, setup);
  useStreamIndex++;
  return hook;
}

export function createEvent<T>(name: string, eventFunc: () => void): Event<T> {
  const event: Event<T> = {
    name,
    streams: [],
  };
  return event;
}
