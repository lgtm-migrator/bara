import * as makeSubject from 'callbag-subject';

interface BaraStreamEmitter {
  (eventType: string, payload?: any): void;
}

interface BaraStreamMethods {
  init: (emit: BaraStreamEmitter, options?: any) => void;
  onEvent?: (eventType: string, payload?: any) => void;
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

  private stream$: any;
  private initialized: boolean = false;

  constructor(public options: StreamOptions) {
    this.id = options.id;
    this.name = options.name;
    this.methods = options.methods;
  }

  /**
   * Initialize the stream and invoke the registed `init` method defined by user.
   * This method is required in the ``methods` options when creating new BaraStream.
   */
  init(): void {
    if (!this.initialized) {
      this.stream$ = makeSubject();
      this.methods.init(this.emit, this.config);
      this.initialized = true;
    }
  }

  /**
   * Emit an event to the stream with a payload.
   * @param {string} eventType Type of the event defined as string.
   * @param {any|option} payload The data emit to the stream.
   */
  public emit(eventType: string, payload?: any) {
    this.stream$(1, {eventType, payload});
  }
}

/**
 * Create a Bara stream which will be used to attach to main bara application
 * to listen on specific event.
 *
 * The event type can be anything you imaging.
 */
export const createStream = (options: StreamOptions) => {
  return new BaraStream(options);
};
