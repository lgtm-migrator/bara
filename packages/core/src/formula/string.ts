/**
 * Cut out any string match search expression
 * @param expr Which character to be trimmed
 */
export const cutString = (expr: string) => (payload: string) =>
  payload.replace(new RegExp(expr), '')
