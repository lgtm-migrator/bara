"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const R = require("ramda");
/**
 * BaraTrigger is the functional unit should be registered to
 * the main Bara application.
 *
 * A BaraTrigger will be defined with: `BaraEvent`, `BaraCondition`, `BaraAction`
 * It is required at least a `BaraEvent` and a `BaraAction` to work standalone.
 *
 * A BaraTrigger can only have a `BaraAction` to be invoked by other `BaraTrigger`
 * without define any `BaraEvent` or `BaraCondition`.
 */
class BaraTrigger {
    constructor(options) {
        this.events = options.events || [];
        this.conditions = options.conditions || [];
        this.actions = options.actions || [];
    }
    /**
     * Initialization the Trigger from the application streams.
     */
    init(streams) {
        // Get all of the stream registered by the main application
        // and filter it before observation.
        this.connectEvents(streams);
        this.connectConditions();
        this.connectActions();
    }
    /**
     * Get list of registered BaraEvent.
     * @return {BaraEvent[]}
     */
    getEvents() {
        return this.events;
    }
    /**
     * Get list of registered BaraCondition.
     * @return {BaraCondition[]}
     */
    getConditions() {
        return this.conditions;
    }
    /**
     * Get list of registered BaraAction.
     * @return {BaraAction[]}
     */
    getActions() {
        return this.actions;
    }
    /**
     * Connect all of events this Trigger should listen to.
     * Retrieve all the streams from events and combine it into one stream of events.
     */
    connectEvents(streams) {
        R.forEach((event) => {
            event.connect(streams);
        }, this.events);
    }
    /**
     * Connect all of conditions this Trigger should check for.
     */
    connectConditions() {
        R.forEach((condition) => {
            console.log(condition);
        }, this.conditions);
    }
    /**
     * Pipe all of actions with the stream after conditions is passed.
     */
    connectActions() {
        R.forEach((action) => {
            console.log(action);
        }, this.actions);
    }
}
exports.BaraTrigger = BaraTrigger;
exports.createTrigger = (options) => {
    return new BaraTrigger(options);
};
//# sourceMappingURL=trigger.js.map