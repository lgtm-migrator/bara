import {createTrigger, BaraTrigger} from '../trigger';
import {createStream, BaraStream} from '../stream';
import {createEvent, BaraEvent} from '../event';
import {mockStreamOptions, mockEventOptions} from '../helpers';

const appStreams: BaraStream[] = [];
let trigger: BaraTrigger;
describe('BaraTrigger', () => {

  beforeAll(() => {
    appStreams.push(
      createStream(mockStreamOptions('File', 3)),
      createStream(mockStreamOptions('IPFS', 5)),
      createStream(mockStreamOptions('Websocket', 5)),
      createStream(mockStreamOptions('HTTP', 7)),
    );
  });

  it('create a trigger with an event and initialize its stream', () => {
    const eventConfig = mockEventOptions('File', ['org.barajs.stream.file', 'org.barajs.stream.ipfs']);
    const fileEvents: BaraEvent[] = [createEvent(eventConfig)];
    trigger = createTrigger({
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
