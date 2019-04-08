import { useInitStream } from './stream'
import { useInitTrigger } from './trigger'

export function useInit(callback: () => void) {
  useInitStream()
  const trigger = useInitTrigger(callback)
}
