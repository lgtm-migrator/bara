import { gather } from '../object'
import { pipe } from './pipe'
import { side } from './side'

/**
 * Execute asynchronous functions in a sequence order.
 */
export const s = pipe

/**
 * Execute asynchronous functions in a parallel order (all executed at the same time).
 */
export const p = side

/**
 * Execute asynchronous functions in a parallel order (all executed at the same time).
 */
export const cull = gather
