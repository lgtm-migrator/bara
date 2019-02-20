"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * BaraAction is the main statements executed by BaraTrigger
 * when a BaraEvent and a BaraCondition is satisfied.
 */
class BaraAction {
    constructor(options) {
        console.log(options);
    }
}
exports.BaraAction = BaraAction;
exports.createAction = (options) => {
    return new BaraAction(options);
};
//# sourceMappingURL=action.js.map