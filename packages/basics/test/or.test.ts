import { createPipe, or } from '../src'

describe('operators/or', () => {
  it('check or condition nested', done => {
    const action1 = jest.fn()
    const action2 = jest.fn()
    const action3 = jest.fn()

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

    const condFalse3 = () => false

    const condPromiseFalse4 = (data: any): Promise<boolean> => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(false)
        }, 100)
      })
    }

    const piper = createPipe(true)

    piper(or(condTrue1, condPromiseTrue2, condFalse3))(action1, action2)

    piper(or(condFalse3, condPromiseFalse4))(action3)

    setTimeout(() => {
      expect(action1).toHaveBeenCalled()
      expect(action2).toHaveBeenCalled()
      expect(action3).not.toHaveBeenCalled()
      done()
    }, 2000)
  })
})
