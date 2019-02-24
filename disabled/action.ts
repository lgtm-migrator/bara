export interface BaraActionOptions {
}

/**
 * BaraAction is the main statements executed by BaraTrigger
 * when a BaraEvent and a BaraCondition is satisfied. 
 */
export class BaraAction {
  constructor(options: BaraActionOptions) {
    console.log(options);
  }
}

export const createAction = (options: BaraActionOptions) => {
  return new BaraAction(options);
};


