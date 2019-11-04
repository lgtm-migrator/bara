import { Formula } from './types'

/**
 * Cut out any string match search expression
 * @param expr Which character to be trimmed
 */
export const cutString = (expr: string) => (payload: string) =>
  payload.replace(new RegExp(expr), '')

/**
 * Build a string by template.
 * Put the replacer in the bracket to map with its key.
 * @example
 * console.log(
 *  template('how {be} {who} {what}?', {
 *    be: 'are',
 *    who: (data: any) => data.name,
 *    what: 'doing',
 *  })({ name: 'Nam' }),
 * )
 * @param s String template
 * @param placeholder Keys of above template to replace
 */
export const template = (
  s: string,
  placeholders: { [k: string]: any | string | Formula },
) => async (payload: any, ...rest: any[]) => {
  let result = s
  for (const place in placeholders) {
    if (place in placeholders) {
      const replacer = placeholders[place]
      result = result.replace(
        `{${place}}`,
        typeof replacer === 'function'
          ? await Promise.resolve(replacer(payload, ...rest))
          : replacer,
      )
    }
  }
  return result
}
// console.log(
//   template('how {be} {who} {what}?', {
//     be: 'are',
//     who: (data: any) => data.name,
//     what: 'doing',
//   })({ name: 'Nam' }),
// )
