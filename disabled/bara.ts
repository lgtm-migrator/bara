import * as R from 'ramda';
import {combine} from 'callbag-basics';
import xs from 'xstream';
import {BaraStream} from './stream';
import {BaraTrigger} from './trigger';
import {BaraEvent} from './event';

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

/**
 * List of Bara's options used when creating new Bara instance.
 */
export interface BaraOptions {
  id?: string;
  name?: string;
  streams?: BaraStream[];
  triggers?: BaraTrigger[];
  mode?: BARA_MODE;
}

/**
 * Main Bara module which will be use to define the application.
 *
 */
export class Bara {
  id?: string;

  name?: string;

  private streams: BaraStream[] = [];

  private triggers: BaraTrigger[] = [];

  private mode: BARA_MODE = BARA_MODE.RUNTIME_MODE;

  private appSource: unknown;

  constructor(options?: BaraOptions) {
    if (options !== undefined) {
      this.streams = options.streams || [];
      this.triggers = options.triggers || [];
      this.mode = options.mode || this.mode;
    }
  }

  /**
   * Retrieve all of the registed streams.
   */
  getStreams(): BaraStream[] {
    return this.streams;
  }

  /**
   * Retrieve app source stream.
   */
  getSource() {
    return this.appSource;
  }

  /**
   * Register a Bara stream to the Bara application.
   * @param {BaraStream} stream Which stream to be used.
   */
  useStream = (stream: BaraStream): void => {
    this.streams.push(stream);
  };

  /**
   * Bara initializer, will be invoked by user in RUNTIME_MODE.
   *
   * It will listen for streams's events and map it with the trigger events.
   */
  init(): void {
    const events = this.registerTrigger() as BaraEvent[];
    const allStreams = R.map((event: BaraEvent) => event.getStreams())(events);
    this.appSource = xs.combine(...allStreams);
  }

  /**
   * Register the triggers with its init method.
   * and map the events stream of the list of registered triggers.
   */
  private registerTrigger(): BaraEvent[][] | BaraEvent[] {
    const getEvents = R.pipe(
      R.map((trigger: BaraTrigger) => {
        trigger.init(this.streams);
        return trigger.getEvents();
      }),
      R.flatten,
    );
    return getEvents(this.triggers);
  }
}

export const bara = (options?: BaraOptions) => {
  return new Bara(options);
};
