import xs, {Stream, Producer, Listener} from 'xstream';

export interface StreamEventPayload<T> {
  eventName: string;
  payload?: T;
}

export interface Ops<T> extends Producer<T> {
  [key: string]: unknown;
}

export interface StreamOptions<T> {
  id: string;
  name: string;
  producer: Ops<T>;
  config?: unknown;
  actions: Array<StreamAction<T>>;
}

export class StreamAction<T> {
  constructor(public eventName: string) {}

  next(value: T): StreamEventPayload<T> {
    return {eventName: this.eventName, payload: value};
  }
}

export class BaraStream<T> {
  /**
   * Unique stream id used to identify which stream is registered
   * in an application.
   *
   * This is very useful for debugging and the Bara devtool for
   * detect different streams.
   *
   * @example
   * org.barajs.stream.file
   */
  id = '';

  /**
   * Name of the Bara stream, define this will help the devtool render
   * declarative statement on the GUI.
   */
  name?: string;

  /**
   * List of predefined events on a stream.
   */
  actions: Array<StreamAction<T>>;

  /**
   * The configuration of user who register the stream.
   */
  config?: unknown;

  /**
   * Stream reference for subcribing/emitting list of events over the time.
   */
  private stream$: Stream<T>;

  /**
   * Flag to check whether the stream has been initialized or not.
   */
  private initialized = false;

  constructor(public options: StreamOptions<T>) {
    this.id = options.id;
    this.name = options.name;
    this.config = options.config;
    this.actions = options.actions;
    this.stream$ = xs.never();
  }

  /**
   * Initialize the stream and invoke the registed `init` method defined by user.
   * This method is required in the ``methods` options when creating new BaraStream.
   */
  init(): void {
    if (!this.initialized) {
      this.stream$ = xs.create(this.options.producer);
      this.initialized = true;
    }
  }

  addListener(listener: Partial<Listener<T>>): void {
    this.stream$.addListener(listener);
  }

  /**
   * Get the stream reference for the sake of combination with other reactive operators.
   */
  getStream(): Stream<T> {
    return this.stream$;
  }
}

/**
 * Create a Bara stream which will be used to attach to main bara application
 * to listen on specific event.
 *
 * The event type can be anything you imaging.
 * @param {StreamOptions} options Required options to create new BaraStream.
 * @return {BaraStream}
 */
export const createStream = <T>(options: StreamOptions<T>): BaraStream<T> => {
  return new BaraStream(options);
};

export const createStreamAction = <T>(eventName: string): StreamAction<T> => {
  return new StreamAction<T>(eventName);
};
