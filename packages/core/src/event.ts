export interface BaraEventOptions {
  id: string;
  name?: string;
}

export class BaraEvent implements BaraEventOptions {
  /**
   * Unique event bundle id
   *
   * @example
   * org.barajs.stream.file
   */
  id: string;

  /**
   * Name of the event describe as declarative English phrases.
   * This name will be display in Bara DevTools and the debugger console.
   */
  name?: string;

  constructor(options: BaraEventOptions) {
    this.id = options.id;
  }
}

export const createEvent = (options: BaraEventOptions) => {
  return new BaraEvent(options);
};
