"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const R = require("ramda");
const change_case_1 = require("change-case");
/**
 * BaraEvent is a way to help the BaraTrigger filter various emitted events.
 * The class should be listen on a specific event registered by the BaraStream's `id`.
 */
class BaraEvent {
    constructor(options) {
        this.streams = [];
        this.streamIds = [];
        this.transforms = [];
        /**
         * Use refs to store user events reference data.
         * This help the Event maker define custom event function to retrieve the ref.
         * The refs always store latest emitted value of an event.
         */
        this.refs = {};
        /**
         * Getter function to retrieve ref by event type.
         */
        this.refFuncs = {};
        this.id = options.id;
        this.name = options.name || 'Unnamed Event';
        this.transforms = options.transforms || [];
        this.streamIds = options.streamIds;
    }
    /**
     * Get event references named data.
     */
    getRef(eventType) {
        return R.prop(eventType, this.refs);
    }
    /**
     * Connect the Bara application with this event.
     * This method should be invoked by the main Bara application,
     * and only link with the specify Stream's `id` or stream's `name` registered by this BaraEvent.
     */
    connect(streams) {
        // Register event transfomer before connect any stream to watch all of the events.
        this.registerTransforms();
        // Define the stream filter function to take advantage of user's registered event only.
        const streamFilter = (stream) => R.contains(stream.id, this.streamIds);
        R.pipe(
        // Filter all of the streams declared in `streamIds` options when creating the BaraEvent.
        (streams) => R.filter(streamFilter, streams), 
        // Connect each filtered stream with this BaraEvent.
        R.forEach((stream) => {
            this.connectStream(stream);
        }))(streams);
    }
    /**
     * Get list of connected streams.
     * @return {BaraStream[]}
     */
    getStreams() {
        return this.streams;
    }
    /**
     * Connect this BaraEvent with a BaraStream to listen on a specific event.
     */
    connectStream(stream) {
        this.streams.push(stream);
        console.log(`[BaraEvent] Registered stream ${stream.name} with event: ${this.name}`);
    }
    registerTransforms() {
        this.refFuncs = R.reduce((acc, transform) => R.assoc(change_case_1.camelCase(transform.funcName), (eventType) => {
            return this.getRef(eventType);
        }, acc), this.refFuncs, this.transforms);
    }
}
exports.BaraEvent = BaraEvent;
/**
 * Create a BaraEvent which will help the Trigger to execute
 * when specific registered stream is emitted an event.
 * @param {BaraEventOptions} options
 * @return {BaraEvent}
 */
exports.createEvent = (options) => {
    return new BaraEvent(options);
};
//# sourceMappingURL=event.js.map