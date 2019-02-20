"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockStreamOptions = (name, max = 5) => ({
    id: `org.barajs.stream.${name.toLowerCase()}`,
    name: `Stream ${name}`,
    methods: {
        init: (emit) => {
            let counter = 0;
            const interval = setInterval(() => {
                if (counter < max) {
                    counter += 1;
                    emit(`${name.toLowerCase()}_${counter}`, counter);
                }
                else {
                    clearInterval(interval);
                }
            }, 1000);
        },
        onEvent: ({ eventType, payload }) => {
            console.log(`Stream event: ${eventType} = ${payload}`);
        },
    },
});
exports.mockEventOptions = (name, streamIds = []) => ({
    streamIds,
    id: `org.barajs.event.${name.toLowerCase()}`,
    name: `Bara Event ${name}`,
});
exports.mockTriggerOptions = (events, conditions = [], actions = []) => ({
    events,
    conditions,
    actions
});
//# sourceMappingURL=helpers.js.map