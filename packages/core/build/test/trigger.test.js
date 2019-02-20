"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const trigger_1 = require("../src/trigger");
const stream_1 = require("../src/stream");
const event_1 = require("../src/event");
const helpers_1 = require("../src/helpers");
const appStreams = [];
let trigger;
describe('BaraTrigger', () => {
    beforeAll(() => {
        appStreams.push(stream_1.createStream(helpers_1.mockStreamOptions('File', 3)), stream_1.createStream(helpers_1.mockStreamOptions('IPFS', 5)), stream_1.createStream(helpers_1.mockStreamOptions('Websocket', 5)), stream_1.createStream(helpers_1.mockStreamOptions('HTTP', 7)));
    });
    it('create a trigger with an event and initialize its stream', () => {
        const eventConfig = helpers_1.mockEventOptions('File', ['org.barajs.stream.file', 'org.barajs.stream.ipfs']);
        const fileEvents = [event_1.createEvent(eventConfig)];
        trigger = trigger_1.createTrigger({
            events: fileEvents,
            conditions: [],
            actions: [],
        });
        trigger.init(appStreams);
        const events = trigger.getEvents();
        expect(events).toHaveLength(fileEvents.length);
        expect(events[0].getStreams()).toHaveLength(eventConfig.streamIds.length);
    });
});
//# sourceMappingURL=trigger.test.js.map