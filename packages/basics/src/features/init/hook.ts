import { useInitStream } from './stream'
import { useInitTrigger } from './trigger'

export function useInit(callback: () => void) {
  useInitTrigger(callback)
}
