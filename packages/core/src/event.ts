import * as R from 'ramda';
import {BaraStream} from './stream';

export interface BaraEventOptions {
  id: string;
  name?: string;
  streamIds: string[];
}

/**
 * BaraEvent is a way to help the BaraTrigger filter various emitted events.
 * The class should be listen on a specific event registered by the BaraStream's `id`.
 */
export class BaraEvent {
  /**
   * Unique event bundle id
   *
   * @example
   * org.barajs.stream.file
   */
  id: string;

  /**
   * Name of the event describe as declarative English phrases.
   * This name will be display in Bara DevTools and the debugger console.
   */
  name?: string;

  private streams: BaraStream[] = [];
  private streamIds: string[] = [];

  constructor(options: BaraEventOptions) {
    this.id = options.id;
    this.name = options.name;
    this.streamIds = options.streamIds;
  }

  /**
   * Connect the Bara application with this event.
   * This method should be invoked by the main Bara application,
   * and only link with the specify Stream's `id` or stream's `name` registered by this BaraEvent.
   */
  public connect(streams: BaraStream[]): void {
    const streamFilter = (stream: BaraStream) => R.contains(stream.id, this.streamIds);
    R.pipe(
      // Filter all of the streams declared in `streamIds` options when creating the BaraEvent.
      (streams: BaraStream[]) => R.filter(streamFilter, streams),

      // Connect each filtered stream with this BaraEvent.
      R.forEach((stream: BaraStream) => {
        this.connectStream(stream);
      }),
    )(streams);
  }

  /**
   * Get list of connected streams.
   * @return {BaraStream[]}
   */
  public getStreams(): BaraStream[] {
    return this.streams;
  }

  /**
   * Connect this BaraEvent with a BaraStream to listen on a specific event.
   */
  private connectStream(stream: BaraStream): void {
    this.streams.push(stream);
    console.log(`Registered stream ${stream.name} with event: ${this.name}`);
  }
}

/**
 * Create a BaraEvent which will help the Trigger to execute
 * when specific registered stream is emitted an event.
 * @param {BaraEventOptions} options
 * @return {BaraEvent}
 */
export const createEvent = (options: BaraEventOptions): BaraEvent => {
  return new BaraEvent(options);
};
