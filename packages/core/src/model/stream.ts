export interface BaraStreamConfig<T> {
  name: string;
  eventTypes: string[];
  setup: (callback: SetupCallbacks<T>) => void;
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
