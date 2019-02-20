"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const observe = require("callbag-observe");
const bara_1 = require("../src/bara");
const stream_1 = require("../src/stream");
const helpers_1 = require("../src/helpers");
let streamOptions;
describe('Bara', () => {
    beforeAll(() => {
        streamOptions = {
            id: 'org.barajs.stream.test',
            name: 'test stream',
            methods: {
                init: emit => {
                    let counter = 0;
                    const max = 5;
                    const interval = setInterval(() => {
                        if (counter < max) {
                            counter += 1;
                            emit('count', counter);
                        }
                        else {
                            clearInterval(interval);
                        }
                    }, 100);
                },
                onEvent: ({ eventType, payload }) => {
                    console.log(`Stream event: ${eventType} = ${payload}`);
                },
            },
        };
    });
    it('create Bara instance', () => {
        const app = bara_1.default();
        expect(app).toHaveProperty('streams');
    });
    it('use Stream in RUNTIME_MODE', () => {
        const app = bara_1.default();
        const stream = stream_1.createStream(streamOptions);
        app.useStream(stream);
        expect(app.getStreams()).toHaveLength(1);
        app.init();
    });
    it('init each Stream in RUNTIME_MODE', () => {
        jest.useFakeTimers();
        const handleEvent = jest.fn();
        const app = bara_1.default();
        const stream = stream_1.createStream(helpers_1.mockStreamOptions('counter', 3));
        app.useStream(stream);
        app.init();
        const source = app.getSource();
        observe(handleEvent)(source);
        jest.advanceTimersByTime(3500);
        expect(handleEvent).toBeCalledWith([]);
    });
});
//# sourceMappingURL=bara.test.js.map