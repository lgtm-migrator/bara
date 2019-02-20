"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const makeSubject = require("callbag-subject");
const observe = require("callbag-observe");
class BaraStream {
    constructor(options) {
        this.options = options;
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
        this.id = '';
        /**
         * Flag to check whether the stream has been initialized or not.
         */
        this.initialized = false;
        this.id = options.id;
        this.name = options.name;
        this.methods = options.methods;
        this.config = options.config;
    }
    /**
     * Initialize the stream and invoke the registed `init` method defined by user.
     * This method is required in the ``methods` options when creating new BaraStream.
     */
    init() {
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
    getStream() {
        return this.stream$;
    }
    /**
     * Emit an event to the stream with a payload.
     * @param {string} eventType Type of the event defined as string.
     * @param {any|option} payload The data emit to the stream.
     */
    emit(eventType, payload) {
        this.stream$(1, { eventType, payload });
    }
}
exports.BaraStream = BaraStream;
/**
 * Create a Bara stream which will be used to attach to main bara application
 * to listen on specific event.
 *
 * The event type can be anything you imaging.
 * @param {StreamOptions} options Required options to create new BaraStream.
 * @return {BaraStream}
 */
exports.createStream = (options) => {
    return new BaraStream(options);
};
//# sourceMappingURL=stream.js.map