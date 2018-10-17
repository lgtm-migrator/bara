export interface BaraConditionOptions {
}

/**
 * BaraCondition is the condition required in BaraTrigger to execute BaraAction
 * when a BaraEvent is satisfied. 
 */
export class BaraCondition {
  constructor(options: BaraConditionOptions) {
    console.log(options);
  }
}

export const createCondition = (options: BaraConditionOptions) => {
  return new BaraCondition(options);
};

