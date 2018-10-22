import * as R from 'ramda';
import {BaraStream} from './stream';
import {camelCase} from 'change-case';

export interface BaraTransformEvent {
  eventType: string;
  refName: string;
  funcName: string;
}

export interface BaraTransformFunc {
  (args?: any): any;
}

export interface BaraEventOptions {
  id: string;
  name?: string;
  transforms?: BaraTransformEvent[];
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
  private transforms: BaraTransformEvent[] = [];

  /**
   * Use refs to store user events reference data.
   * This help the Event maker define custom event function to retrieve the ref.
   * The refs always store latest emitted value of an event.
   */
  private refs: any = {};

  /**
   * Getter function to retrieve ref by event type.
   */
  private refFuncs: {[key: string]: BaraTransformFunc} = {};

  constructor(options: BaraEventOptions) {
    this.id = options.id;
    this.name = options.name || 'Unnamed Event';
    this.transforms = options.transforms || [];
    this.streamIds = options.streamIds;
  }

  /**
   * Get event references named data.
   */
  public getRef(eventType: string): any | undefined {
    return R.prop(eventType, this.refs);
  }

  /**
   * Connect the Bara application with this event.
   * This method should be invoked by the main Bara application,
   * and only link with the specify Stream's `id` or stream's `name` registered by this BaraEvent.
   */
  public connect(streams: BaraStream[]): void {
    // Register event transfomer before connect any stream to watch all of the events.
    this.registerTransforms();

    // Define the stream filter function to take advantage of user's registered event only.
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
    console.log(`[BaraEvent] Registered stream ${stream.name} with event: ${this.name}`);
  }

  private registerTransforms(): void {
    this.refFuncs = R.reduce(
      (acc: any, transform: BaraTransformEvent) =>
        R.assoc(
          camelCase(transform.funcName),
          (eventType: string) => {
            return this.getRef(eventType);
          },
          acc,
        ),
      this.refFuncs,
      this.transforms,
    );
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
