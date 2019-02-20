import { BaraStream } from './stream';
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
export declare class BaraEvent {
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
    private streams;
    private streamIds;
    private transforms;
    /**
     * Use refs to store user events reference data.
     * This help the Event maker define custom event function to retrieve the ref.
     * The refs always store latest emitted value of an event.
     */
    private refs;
    /**
     * Getter function to retrieve ref by event type.
     */
    private refFuncs;
    constructor(options: BaraEventOptions);
    /**
     * Get event references named data.
     */
    getRef(eventType: string): any | undefined;
    /**
     * Connect the Bara application with this event.
     * This method should be invoked by the main Bara application,
     * and only link with the specify Stream's `id` or stream's `name` registered by this BaraEvent.
     */
    connect(streams: BaraStream[]): void;
    /**
     * Get list of connected streams.
     * @return {BaraStream[]}
     */
    getStreams(): BaraStream[];
    /**
     * Connect this BaraEvent with a BaraStream to listen on a specific event.
     */
    private connectStream;
    private registerTransforms;
}
/**
 * Create a BaraEvent which will help the Trigger to execute
 * when specific registered stream is emitted an event.
 * @param {BaraEventOptions} options
 * @return {BaraEvent}
 */
export declare const createEvent: (options: BaraEventOptions) => BaraEvent;
