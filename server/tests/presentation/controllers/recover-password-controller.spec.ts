import { RecoverPasswordController } from '@/presentation/controllers'
import { badRequest, serverError, noContent } from '@/presentation/helpers'
import { MissingParamError } from '@/presentation/errors'
import { SendRecoverEmailSpy, ValidationSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'

import faker from 'faker'

const mockRequest = (): RecoverPasswordController.Request => ({
  email: faker.internet.email()
})

type SutTypes = {
  sut: RecoverPasswordController
  sendRecoverEmailSpy: SendRecoverEmailSpy
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const sendRecoverEmailSpy = new SendRecoverEmailSpy()
  const validationSpy = new ValidationSpy()
  const sut = new RecoverPasswordController(sendRecoverEmailSpy, validationSpy)
  return {
    sut,
    sendRecoverEmailSpy,
    validationSpy
  }
}

describe('RecoverPassword Controller', () => {
  describe('SendRecoverEmail UseCase', () => {
    it('Should call SendRecoverEmail with correct values', async () => {
      const { sut, sendRecoverEmailSpy } = makeSut()
      const request = mockRequest()

      await sut.handle(request)

      expect(sendRecoverEmailSpy.email).toBe(request.email)
    })

    it('Should return 204 if not throws', async () => {
      const { sut } = makeSut()
      const httpResponse = await sut.handle(mockRequest())

      expect(httpResponse).toEqual(noContent())
    })

    it('Should return 500 if throws', async () => {
      const { sut, sendRecoverEmailSpy } = makeSut()
      jest.spyOn(sendRecoverEmailSpy, 'execute').mockImplementationOnce(throwError)

      const httpResponse = await sut.handle(mockRequest())

      expect(httpResponse).toEqual(serverError(new Error()))
    })
  })

  describe('Validation', () => {
    it('Should call Validation with correct value', async () => {
      const { sut, validationSpy } = makeSut()
      const request = mockRequest()

      await sut.handle(request)

      expect(validationSpy.input).toEqual(request)
    })

    it('Should return 400 if Validation returns an error', async () => {
      const { sut, validationSpy } = makeSut()
      validationSpy.error = new MissingParamError(faker.random.word())

      const httpResponse = await sut.handle(mockRequest())

      expect(httpResponse).toEqual(badRequest(validationSpy.error))
    })
  })
})
