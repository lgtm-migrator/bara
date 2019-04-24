import * as ExportedStreams from './features'

export interface UseBasicsStreamConfig {
  Init?: boolean
  Timer?: boolean
}

const defaultConfig: UseBasicsStreamConfig = {
  Init: true,
  Timer: true,
}

/**
 * Register all components as Bara stream
 */
export function useBasicsStream(config?: UseBasicsStreamConfig) {
  const combinedConfig = { ...defaultConfig, ...config }
  for (const component in combinedConfig) {
    if ((combinedConfig as any)[component] === true) {
      const methodName = `use${component}Stream`
      if (methodName in ExportedStreams) {
        ;(ExportedStreams as any)[methodName]()
      }
    }
  }
}
