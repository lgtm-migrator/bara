import { createSequencePipe } from '../src'

describe('operators/pipe', () => {
  it('check every condition and execute each function in a sequence', done => {
    const action1 = jest.fn()
    const action2 = jest.fn()
    const condTrue1 = (data: any) => {
      return true
    }
    const condPromiseTrue2 = (data: any): Promise<boolean> => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(true)
        }, 100)
      })
    }
    const piper = createSequencePipe(true)

    expect(action1).not.toHaveBeenCalled()
    expect(action2).not.toHaveBeenCalled()

    piper(condTrue1, condPromiseTrue2)(action1, action2)

    setTimeout(() => {
      expect(action1).toHaveBeenCalled()
      expect(action2).toHaveBeenCalled()
      done()
    }, 2000)
  })
})
