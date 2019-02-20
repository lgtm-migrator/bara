import { BaraStream } from './stream';
import { BaraTrigger } from './trigger';
export declare enum BARA_MODE {
    RUNTIME_MODE = 0,
    MODULE_MODE = 1
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
export declare class Bara {
    id?: string;
    name?: string;
    private streams;
    private triggers;
    private mode;
    private appSource;
    constructor(options?: BaraOptions);
    /**
     * Retrieve all of the registed streams.
     */
    getStreams(): BaraStream[];
    /**
     * Retrieve app source stream.
     */
    getSource(): any;
    /**
     * Register a Bara stream to the Bara application.
     * @param {BaraStream} stream Which stream to be used.
     */
    useStream: (stream: BaraStream) => void;
    /**
     * Bara initializer, will be invoked by user in RUNTIME_MODE.
     *
     * It will listen for streams's events and map it with the trigger events.
     */
    init(): void;
    /**
     * Register the triggers with its init method.
     * and map the events stream of the list of registered triggers.
     */
    private registerTrigger;
}
export declare const bara: (options?: BaraOptions | undefined) => Bara;
export default bara;
