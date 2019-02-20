import { BaraStream } from './stream';
import { BaraEvent } from './event';
import { BaraCondition } from './condition';
import { BaraAction } from './action';
export interface BaraTriggerOptions {
    events?: BaraEvent[];
    conditions?: BaraCondition[];
    actions?: BaraAction[];
}
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
export declare class BaraTrigger {
    private events;
    private conditions;
    private actions;
    constructor(options: BaraTriggerOptions);
    /**
     * Initialization the Trigger from the application streams.
     */
    init(streams: BaraStream[]): void;
    /**
     * Get list of registered BaraEvent.
     * @return {BaraEvent[]}
     */
    getEvents(): BaraEvent[];
    /**
     * Get list of registered BaraCondition.
     * @return {BaraCondition[]}
     */
    getConditions(): BaraCondition[];
    /**
     * Get list of registered BaraAction.
     * @return {BaraAction[]}
     */
    getActions(): BaraAction[];
    /**
     * Connect all of events this Trigger should listen to.
     * Retrieve all the streams from events and combine it into one stream of events.
     */
    private connectEvents;
    /**
     * Connect all of conditions this Trigger should check for.
     */
    private connectConditions;
    /**
     * Pipe all of actions with the stream after conditions is passed.
     */
    private connectActions;
}
export declare const createTrigger: (options: BaraTriggerOptions) => BaraTrigger;
