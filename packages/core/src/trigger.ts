export interface Event {
  name: string;
}

export interface Trigger {
  name: string;
  events: Event[];
  activate: () => void;
}

let useEventIndex = 0;
const useEventHooks: EventHook[] = [];
const events: Event[] = [];

interface EventAction {
  (eventName: string, payload: unknown): void;
}

interface EventHook extends Array<Event | EventAction> {
  0: Event;
  1: EventAction;
}

function registerEventHook(index: number, event: Event) {
  if (!useEventHooks[index]) {
    console.log(`Registering event: ${event.name}`);
    events.push(event);
    useEventHooks.push([
      event,
      (eventName, payload) => {
        event.name = eventName;
      },
    ]);
  }

  return useEventHooks[index];
}

export function useEvent(event: Event) {
  const hookEvent = registerEventHook(useEventIndex, event);
  useEventIndex++;
  return [events, () => {}];
}

export function createTrigger(name: string, triggerFunc: () => void): Trigger {
  const trigger: Trigger = {
    name,
    events,
    activate: () => {
      triggerFunc();
      console.log(`Registered trigger: ${name}`);
    },
  };
  return trigger;
}
