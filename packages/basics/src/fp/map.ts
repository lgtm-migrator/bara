import { DoWithAction, ExtraParam } from './model'

const mapPayload = (value: any, index: number, array: any[]) => (
  payload: any,
  extras: Set<ExtraParam>,
) => async (action: DoWithAction) => {
  const result = await action({ value, index, array, payload }, extras)
  return result
}

export const mapWith = (propName: string, action: DoWithAction) => async (
  payload: any,
  extras: Set<ExtraParam>,
) => {
  const result =
    propName in payload && payload[propName].length
      ? await Promise.all(
          payload[propName].map((value: any, index: number, array: any[]) =>
            mapPayload(value, index, array)(payload, extras)(action),
          ),
        )
      : []
  return result
}
