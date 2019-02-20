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
export declare class BaraStream {
    options: StreamOptions;
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
    id: string;
    /**
     * Name of the Bara stream, define this will help the devtool render
     * declarative statement on the GUI.
     */
    name?: string;
    /**
     * Define some methods the stream required to be operated.
     */
    methods: BaraStreamMethods;
    /**
     * The configuration of user who register the stream.
     */
    config?: any;
    /**
     * Stream reference for subcribing/emitting list of events over the time.
     */
    private stream$;
    /**
     * Flag to check whether the stream has been initialized or not.
     */
    private initialized;
    constructor(options: StreamOptions);
    /**
     * Initialize the stream and invoke the registed `init` method defined by user.
     * This method is required in the ``methods` options when creating new BaraStream.
     */
    init(): void;
    /**
     * Get the stream reference for the sake of combination with other reactive operators.
     */
    getStream(): StreamRef;
    /**
     * Emit an event to the stream with a payload.
     * @param {string} eventType Type of the event defined as string.
     * @param {any|option} payload The data emit to the stream.
     */
    emit(eventType: string, payload?: any): void;
}
/**
 * Create a Bara stream which will be used to attach to main bara application
 * to listen on specific event.
 *
 * The event type can be anything you imaging.
 * @param {StreamOptions} options Required options to create new BaraStream.
 * @return {BaraStream}
 */
export declare const createStream: (options: StreamOptions) => BaraStream;
