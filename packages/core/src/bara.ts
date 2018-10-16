import * as R from 'ramda';
import {BaraStream} from './stream';

/*
 * There is two modes in a Bara application: RUNTIME_MODE and MODULE_MODE.
 *
 * In `RUNTIME_MODE` (default):
 * The `init` method will be automatically invoked when registering the application.
 *
 * In `MODULE_MODE`:
 * The `init` method will be invoked by user only.
 */
export enum BARA_MODE {
  RUNTIME_MODE,
  MODULE_MODE,
}

export interface BaraOptions {
  streams: BaraStream[];
  mode?: BARA_MODE;
}

/**
 * Main Bara module which will be use to define the application.
 *
 */
export class Bara {
  public streams: BaraStream[] = [];

  private mode: BARA_MODE = BARA_MODE.RUNTIME_MODE;

  constructor(options?: BaraOptions) {
    if (options !== undefined) {
      this.streams = options.streams;
      this.mode = options.mode || this.mode;
    }
  }

  /**
   * Register a Bara stream to the Bara application.
   * @param {BaraStream} stream Which stream to be used.
   */
  public useStream = (stream: BaraStream): void => {
    this.streams.push(stream);
  };

  /**
   * Bara initializer, will be invoked by user in RUNTIME_MODE.
   */
  public init(): void {
    R.forEach((stream: BaraStream) => {
      this.registerStream(stream);
    }, this.streams);
  }

  /**
   * Register the stream with its init method.
   */
  private registerStream(stream: BaraStream): void {
    stream.init();
  }
}

export const bara = (options?: BaraOptions) => {
  return new Bara(options);
};

export default bara;
