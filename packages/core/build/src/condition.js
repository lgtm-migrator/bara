"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * BaraCondition is the condition required in BaraTrigger to execute BaraAction
 * when a BaraEvent is satisfied.
 */
class BaraCondition {
    constructor(options) {
        console.log(options);
    }
}
exports.BaraCondition = BaraCondition;
exports.createCondition = (options) => {
    return new BaraCondition(options);
};
//# sourceMappingURL=condition.js.map