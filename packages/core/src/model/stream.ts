import {Stream} from 'xstream';

export interface BaraStreamPayload<T> {
  eventType: string;
  payload: T;
}

export interface BaraStreamConfig<T> {
  name?: string;
  eventTypes: string[];
  setup: (callback: SetupCallbacks<T>) => void;
}

export interface BaraStream<T> {
  _$: Stream<BaraStreamPayload<T>>;
  config: BaraStreamConfig<T>;
}

export interface SetupCallbacks<T> {
  emit?: (eventType: string, payload: T) => void;
  emitCallback?: (
    eventType: string,
    payload: T,
    callback: (...args: any) => void,
  ) => void;
  error?: (errorMessage: string) => void;
  done?: () => void;
  options?: any;
}
