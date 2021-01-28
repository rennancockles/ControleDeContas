import { ok } from '@/presentation/helpers'
import { IController, IHttpResponse } from '@/presentation/protocols'
import { LogControllerDecorator } from '@/main/decorators'

import faker from 'faker'

// const mockServerError = (): IHttpResponse => {
//   const fakeError = new Error()
//   fakeError.stack = 'any_stack'
//   return serverError(fakeError)
// }

class ControllerSpy implements IController {
  request: any
  httpResponse = ok(faker.random.uuid())

  async handle (request: any): Promise<IHttpResponse> {
    this.request = request
    return this.httpResponse
  }
}

type SutTypes = {
  sut: LogControllerDecorator
  controllerSpy: ControllerSpy
}

const makeSut = ():SutTypes => {
  const controllerSpy = new ControllerSpy()
  const sut = new LogControllerDecorator(controllerSpy)

  return {
    sut,
    controllerSpy
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

  // test('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
  //   const { sut, controllerSpy } = makeSut()
  //   const serverError = mockServerError()
  //   controllerSpy.httpResponse = serverError
  //   await sut.handle(faker.lorem.sentence())
  //   expect(logErrorRepositorySpy.stack).toBe(serverError.body.stack)
  // })
})
