import * as R from 'ramda';
import xs from 'xstream';
import {Trigger} from './trigger';
import {Event} from './event';

let run: () => void;
let useTriggerIndex = 0;

interface TriggerHook extends Array<Trigger | number> {
  0: Trigger;
}

const useTriggerHooks: TriggerHook[] = [];

function registerTriggerHook(index: number, trigger: Trigger) {
  if (!useTriggerHooks[index]) {
    // activating trigger to registering events
    trigger.activate();
    useTriggerHooks!.push([trigger]);
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
  };
  return {run};
}
