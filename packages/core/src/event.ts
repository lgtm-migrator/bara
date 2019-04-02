import {BaraTriggerConfig} from './model/trigger';
import {slugify} from './helpers/string';

export function createEvent<T>(eventName: string) {
  return (trigger: BaraTriggerConfig<T>) => {
    return slugify(`${trigger.name}___${eventName}`);
  };
}
