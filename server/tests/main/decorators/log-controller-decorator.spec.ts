import { ok, serverError } from '@/presentation/helpers'
import { IController, IHttpResponse } from '@/presentation/protocols'
import { LogControllerDecorator } from '@/main/decorators'

import faker from 'faker'
import { IErrorLogger } from '@/infra/log'

const mockServerError = (): IHttpResponse => {
  const fakeError = new Error()
  fakeError.stack = 'any_stack'
  return serverError(fakeError)
}

class ControllerSpy implements IController {
  request: any
  httpResponse = ok(faker.random.uuid())

  async handle (request: any): Promise<IHttpResponse> {
    this.request = request
    return this.httpResponse
  }
}

class LogErrorSpy implements IErrorLogger {
  stack: string

  async logError (stack: string): Promise<void> {
    this.stack = stack
  }
}

type SutTypes = {
  sut: LogControllerDecorator
  controllerSpy: ControllerSpy
  logErrorSpy: LogErrorSpy
}

const makeSut = ():SutTypes => {
  const controllerSpy = new ControllerSpy()
  const logErrorSpy = new LogErrorSpy()
  const sut = new LogControllerDecorator(controllerSpy, logErrorSpy)

  return {
    sut,
    controllerSpy,
    logErrorSpy
  }
}

describe('LogController Decorator', () => {
  describe('Controller', () => {
    it('Should should call controller handle', async () => {
      const { sut, controllerSpy } = makeSut()
      const request = faker.lorem.sentence()

      await sut.handle(request)

      expect(controllerSpy.request).toEqual(request)
    })

    it('Should return the same result of the controller', async () => {
      const { sut, controllerSpy } = makeSut()
      const request = faker.lorem.sentence()

      const httpResponse = await sut.handle(request)

      expect(httpResponse).toEqual(controllerSpy.httpResponse)
    })
  })

  it('Should call LogError with correct error if controller returns a server error', async () => {
    const { sut, controllerSpy, logErrorSpy } = makeSut()
    const serverError = mockServerError()
    controllerSpy.httpResponse = serverError

    await sut.handle(faker.lorem.sentence())

    expect(logErrorSpy.stack).toBe(serverError.body.stack)
  })
})
