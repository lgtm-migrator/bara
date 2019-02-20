"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = require("../src/event");
const stream_1 = require("../src/stream");
const helpers_1 = require("../src/helpers");
let config;
describe('BaraEvent', () => {
    beforeAll(() => {
        config = {
            id: 'org.barajs.event.file',
            name: 'Event File',
            streamIds: ['org.barajs.stream.file', 'org.barajs.stream.websocket'],
        };
    });
    it('create an event', () => {
        const event = event_1.createEvent(config);
        expect(event.id).toEqual(config.id);
        expect(event.name).toEqual(config.name);
    });
    it('connect to a list of filtered streams', () => {
        const event = event_1.createEvent(config);
        expect(event.getStreams()).toHaveLength(0);
        const sampleMethods = {
            init: () => { },
            onEvent: () => { },
        };
        const streams = [
            stream_1.createStream({
                id: 'org.barajs.stream.file',
                name: 'Stream File',
                methods: sampleMethods,
            }),
            stream_1.createStream({
                id: 'org.barajs.stream.ipfs',
                name: 'Stream IPFS',
                methods: sampleMethods,
            }),
            stream_1.createStream({
                id: 'org.barajs.stream.websocket',
                name: 'Stream Websocket',
                methods: sampleMethods,
            }),
        ];
        event.connect(streams);
        expect(event.getStreams()).toHaveLength(2);
    });
    it('register transform event named function', () => {
        const options = helpers_1.mockEventOptions('transform', []);
        const event = event_1.createEvent(Object.assign({}, options, { transforms: [
                {
                    eventType: 'FILE_CHANGED',
                    refName: 'fileChanged',
                    funcName: 'getChangedFile',
                },
            ] }));
        expect(event.getRef('FILE_CHANGED')).toBeUndefined();
    });
});
//# sourceMappingURL=event.test.js.map