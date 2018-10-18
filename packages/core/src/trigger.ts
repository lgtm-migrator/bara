import * as R from 'ramda';
import {BaraStream} from './stream';
import {BaraEvent} from './event';
import {BaraCondition} from './condition';
import {BaraAction} from './action';

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
export class BaraTrigger {
  private events: BaraEvent[];
  private conditions: BaraCondition[];
  private actions: BaraAction[];

  constructor(options: BaraTriggerOptions) {
    this.events = options.events || [];
    this.conditions = options.conditions || [];
    this.actions = options.actions || [];
  }

  /**
   * Initialization the Trigger from the application streams.
   */
  public init(streams: BaraStream[]): void {
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
  public getEvents(): BaraEvent[] {
    return this.events;
  }

  /**
   * Get list of registered BaraCondition.
   * @return {BaraCondition[]}
   */
  public getConditions(): BaraCondition[] {
    return this.conditions;
  }

  /**
   * Get list of registered BaraAction.
   * @return {BaraAction[]}
   */
  public getActions(): BaraAction[] {
    return this.actions;
  }

  /**
   * Connect all of events this Trigger should listen to.
   * Retrieve all the streams from events and combine it into one stream of events.
   */
  private connectEvents(streams: BaraStream[]): void {
    R.forEach((event: BaraEvent) => {
      event.connect(streams);
    }, this.events);
  }

  /**
   * Connect all of conditions this Trigger should check for.
   */
  private connectConditions(): void {
    R.forEach((condition: BaraCondition) => {
      console.log(condition);
    }, this.conditions);
  }

  /**
   * Pipe all of actions with the stream after conditions is passed.
   */
  private connectActions(): void {
    R.forEach((action: BaraAction) => {
      console.log(action);
    }, this.actions);
  }
}

export const createTrigger = (options: BaraTriggerOptions) => {
  return new BaraTrigger(options);
};
