import { ErrorLoggerComposite, IErrorLogger } from '@/infra/log'
import { throwError } from '@/tests/domain/mocks'

import faker from 'faker'

class ErrorLoggerSpy implements IErrorLogger {
  stack: string

  async logError (stack: string): Promise<void> {
    this.stack = stack
  }
}

type SutTypes = {
  sut: ErrorLoggerComposite
  errorLoggerSpies: ErrorLoggerSpy[]
}

const makeSut = (): SutTypes => {
  const errorLoggerSpies = [
    new ErrorLoggerSpy(),
    new ErrorLoggerSpy()
  ]
  const sut = new ErrorLoggerComposite(errorLoggerSpies)
  return {
    sut,
    errorLoggerSpies
  }
}

describe('ErrorLogger Composite', () => {
  it('Should call all ErrorLogger with the same input', async () => {
    const { sut, errorLoggerSpies } = makeSut()
    const stack = faker.lorem.sentence()

    await sut.logError(stack)

    expect(errorLoggerSpies[0].stack).toBe(stack)
    expect(errorLoggerSpies[1].stack).toBe(stack)
  })

  it('Should throw if any logger throws', async () => {
    const { sut, errorLoggerSpies } = makeSut()
    const stack = faker.lorem.sentence()
    jest.spyOn(errorLoggerSpies[0], 'logError').mockImplementationOnce(throwError)

    const promise = sut.logError(stack)

    await expect(promise).rejects.toThrow()
  })

  it('Should pass succesfully in no loggers is passed by param', async () => {
    const sut = new ErrorLoggerComposite([])
    const stack = faker.lorem.sentence()

    const promise = sut.logError(stack)

    await expect(promise).resolves.not.toThrow()
  })
})
