import {Formula} from '../types'

export const find = (formula: Formula) => (payload: any[], ...rest: any[]) => {
    return payload.find((element: any) => formula(payload, ...rest))
}
