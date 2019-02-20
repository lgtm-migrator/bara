"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const R = require("ramda");
const callbag_basics_1 = require("callbag-basics");
/*
 * There is two modes in a Bara application: RUNTIME_MODE and MODULE_MODE.
 *
 * In `RUNTIME_MODE` (default):
 * The `init` method will be automatically invoked when registering the application.
 *
 * In `MODULE_MODE`:
 * The `init` method will be invoked by user only.
 */
var BARA_MODE;
(function (BARA_MODE) {
    BARA_MODE[BARA_MODE["RUNTIME_MODE"] = 0] = "RUNTIME_MODE";
    BARA_MODE[BARA_MODE["MODULE_MODE"] = 1] = "MODULE_MODE";
})(BARA_MODE = exports.BARA_MODE || (exports.BARA_MODE = {}));
/**
 * Main Bara module which will be use to define the application.
 *
 */
class Bara {
    constructor(options) {
        this.streams = [];
        this.triggers = [];
        this.mode = BARA_MODE.RUNTIME_MODE;
        /**
         * Register a Bara stream to the Bara application.
         * @param {BaraStream} stream Which stream to be used.
         */
        this.useStream = (stream) => {
            this.streams.push(stream);
        };
        if (options !== undefined) {
            this.streams = options.streams || [];
            this.triggers = options.triggers || [];
            this.mode = options.mode || this.mode;
        }
    }
    /**
     * Retrieve all of the registed streams.
     */
    getStreams() {
        return this.streams;
    }
    /**
     * Retrieve app source stream.
     */
    getSource() {
        return this.appSource;
    }
    /**
     * Bara initializer, will be invoked by user in RUNTIME_MODE.
     *
     * It will listen for streams's events and map it with the trigger events.
     */
    init() {
        const events = this.registerTrigger();
        const allStreams = R.map((event) => event.getStreams())(events);
        this.appSource = callbag_basics_1.combine(...allStreams);
    }
    /**
     * Register the triggers with its init method.
     * and map the events stream of the list of registered triggers.
     */
    registerTrigger() {
        const getEvents = R.pipe(R.map((trigger) => {
            trigger.init(this.streams);
            return trigger.getEvents();
        }), R.flatten);
        return getEvents(this.triggers);
    }
}
exports.Bara = Bara;
exports.bara = (options) => {
    return new Bara(options);
};
exports.default = exports.bara;
//# sourceMappingURL=bara.js.map