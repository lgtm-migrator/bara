import * as R from 'ramda';
import xs from 'xstream';
import {Trigger, Event} from './trigger';

let run: () => void;
let useTriggerIndex = 0;
let TOTAL_EVENTS = 0;

interface TriggerHook extends Array<Event[] | number> {
  0: Event[];
}

const useTriggerHooks: TriggerHook[] = [];

function registerTriggerHook(index: number, trigger: Trigger) {
  if (!useTriggerHooks[index]) {
    // activating trigger to registering events
    trigger.activate();
    TOTAL_EVENTS += trigger.events.length;
    useTriggerHooks!.push([trigger.events]);
  }
  return useTriggerHooks[index];
}

export function useTrigger(trigger: Trigger): TriggerHook {
  const hook = registerTriggerHook(useTriggerIndex, trigger);
  useTriggerIndex++;
  return hook;
}

export function bara(app: () => void) {
  run = () => {
    app();
    console.log(`TOTAL EVENTS: ${TOTAL_EVENTS}`);
  };
  return {run};
}
