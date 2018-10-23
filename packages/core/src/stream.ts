import * as makeSubject from 'callbag-subject';
import * as observe from 'callbag-observe';

export interface StreamEventPayload {
  eventType: string;
  payload?: any;
}

export interface StreamRef {
  (action: number, payload: StreamEventPayload): void;
}

export interface BaraStreamEmitter {
  (eventType: string, payload?: any): void;
}

export interface BaraStreamMethods {
  init: (emit: BaraStreamEmitter, options?: any) => void;
  onEvent: (eventPayload: StreamEventPayload) => void;
}

export interface StreamOptions {
  id: string;
  name: string;
  methods: BaraStreamMethods;
  config?: any;
}

export class BaraStream {
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
  public id: string = '';

  /**
   * Name of the Bara stream, define this will help the devtool render
   * declarative statement on the GUI.
   */
  public name?: string;

  /**
   * Define some methods the stream required to be operated.
   */
  public methods: BaraStreamMethods;

  /**
   * The configuration of user who register the stream.
   */
  public config?: any;

  /**
   * Stream reference for subcribing/emitting list of events over the time.
   */
  private stream$: any;

  /**
   * Flag to check whether the stream has been initialized or not.
   */
  private initialized: boolean = false;

  constructor(public options: StreamOptions) {
    this.id = options.id;
    this.name = options.name;
    this.methods = options.methods;
    this.config = options.config;
  }

  /**
   * Initialize the stream and invoke the registed `init` method defined by user.
   * This method is required in the ``methods` options when creating new BaraStream.
   */
  init(): void {
    if (!this.initialized) {
      // Create a subject stream that is emittable.
      this.stream$ = makeSubject();

      // Invoke init method to setup the stream.
      this.methods.init(this.emit.bind(this), this.config);

      // Observe on the stream event emitted by the consumer.
      observe(this.methods.onEvent)(this.stream$);
      
      // Mark stream as initialized.
      this.initialized = true;
    }
  }

  /**
   * Get the stream reference for the sake of combination with other reactive operators.
   */
  public getStream(): StreamRef {
    return this.stream$;
  }

  /**
   * Emit an event to the stream with a payload.
   * @param {string} eventType Type of the event defined as string.
   * @param {any|option} payload The data emit to the stream.
   */
  public emit(eventType: string, payload?: any): void {
    this.stream$(1, {eventType, payload});
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
export const createStream = (options: StreamOptions): BaraStream => {
  return new BaraStream(options);
};
