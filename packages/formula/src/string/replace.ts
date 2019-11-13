import { Formula } from '../types'

export interface ReplaceProps {
  find: string | RegExp
  replace: Formula | string
}

/**
 * Replace search string with a replacer.
 *
 * @example
 * replace({
 *  find: 'what',
 *  replace: 'this'
 * })
 */
export const replace = (props: ReplaceProps) => (
  payload: string,
  ...rest: any[]
) => {
  const replacer =
    typeof props.replace === 'string'
      ? props.replace
      : props.replace(payload, ...rest)
  return payload.replace(props.find, replacer)
}
