import {Formula} from '../types'
import {lensProp} from '../object'

export const groupBy = (prop: string) => (payload: any, ...rest: any[]) => {
    let accumulate = {};
    for (const element of payload) {
        const value = lensProp(prop)(element, ...rest)
        if (value) {
            if (!accumulate[value]) {
                accumulate[value] = [] 
            }
                accumulate[value] = [...accumulate[value], element]
        }
    }
    return accumulate;
}
