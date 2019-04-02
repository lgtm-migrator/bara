import { useStreamHook } from '../src/hooks/use-stream'
import { BaraStreamConfig } from '../src/model'

describe('hooks/use-stream', () => {
  it('throw error when not provide setup function', () => {
    expect(() => {
      const config = {} as BaraStreamConfig<string>
      useStreamHook(config)
    }).toThrow(new Error('Please specify "setup" function in a Bara Stream'))
  })
})
