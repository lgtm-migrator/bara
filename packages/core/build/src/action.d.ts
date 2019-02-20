export interface BaraActionOptions {
}
/**
 * BaraAction is the main statements executed by BaraTrigger
 * when a BaraEvent and a BaraCondition is satisfied.
 */
export declare class BaraAction {
    constructor(options: BaraActionOptions);
}
export declare const createAction: (options: BaraActionOptions) => BaraAction;
