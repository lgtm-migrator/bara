import { lensProp } from '../object'

/**
 * Report a message with the help of string templating
 * and nested prop
 *
 * @example
 *
 * report(
 *  'Hello {world}, {greet.message}!'
 * )({world: 'Bara', greet: {message: "How are you?"}})
 * // console.log: "Hello Bara, How are you?"
 */
export const report = (
  message: string,
  adapter: any = console,
  loggerMethod: string = 'log',
) => (payload: any, ...rest: any[]) => {
  const replacer = message.replace(
    /\{([A-Za-z0-9._]+)\}/g,
    (_: string, prop: string) => lensProp(prop)(payload) || `[${prop}]`,
  )
  adapter[loggerMethod](replacer)
  return [payload, ...rest]
}

// Prototype
// const result = report(
//   `{hello}, this message come from {from}. {nested.chi_ld}`,
// )({
//   hello: 'Hi',
//   from: 'Nam',
//   nested: { chi_ld: 'Awesome!' },
// })
// result
