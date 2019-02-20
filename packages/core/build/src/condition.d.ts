export interface BaraConditionOptions {
}
/**
 * BaraCondition is the condition required in BaraTrigger to execute BaraAction
 * when a BaraEvent is satisfied.
 */
export declare class BaraCondition {
    constructor(options: BaraConditionOptions);
}
export declare const createCondition: (options: BaraConditionOptions) => BaraCondition;
