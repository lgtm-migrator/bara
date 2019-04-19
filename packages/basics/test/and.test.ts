import { and, createPipe } from '../src'

describe('operators/and', () => {
  it('check and condition nested', done => {
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
    const piper = createPipe(true)

    piper(and(and(condTrue1, condPromiseTrue2), condPromiseTrue2))(
      action1,
      action2,
    )

    setTimeout(() => {
      expect(action1).toHaveBeenCalled()
      expect(action2).toHaveBeenCalled()
      done()
    }, 2000)
  })
})
