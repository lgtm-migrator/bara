import {createStream} from '../stream'

describe('Bara Stream', () => {
  it('initialized the bara stream', () => {
    const SampleStream = createStream({
      id: 'org.barajs.stream.file',
      name: 'Stream File',
      methods: {
        init: (emit, config) => {}
      }
    }
  })
})
