import { LoginController } from '@/presentation/controllers'
import { badRequest, serverError, unauthorized, ok } from '@/presentation/helpers'
import { MissingParamError } from '@/presentation/errors'
import { AuthenticationSpy, ValidationSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'

import faker from 'faker'

const mockRequest = (): LoginController.Request => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

type SutTypes = {
  sut: LoginController
  authenticationSpy: AuthenticationSpy
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const authenticationSpy = new AuthenticationSpy()
  const validationSpy = new ValidationSpy()
  const sut = new LoginController(authenticationSpy, validationSpy)
  return {
    sut,
    authenticationSpy,
    validationSpy
  }
}

describe('Login Controller', () => {
  describe('Authentication UseCase', () => {
    it('Should call Authentication with correct values', async () => {
      const { sut, authenticationSpy } = makeSut()
      const request = mockRequest()

      await sut.handle(request)

      expect(authenticationSpy.params).toEqual({
        email: request.email,
        password: request.password
      })
    })

    it('Should return 401 if invalid credentials are provided', async () => {
      const { sut, authenticationSpy } = makeSut()
      authenticationSpy.result = null

      const httpResponse = await sut.handle(mockRequest())

      expect(httpResponse).toEqual(unauthorized())
    })

    it('Should return 500 if Login throws', async () => {
      const { sut, authenticationSpy } = makeSut()
      jest.spyOn(authenticationSpy, 'execute').mockImplementationOnce(throwError)

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

    it('Should return 200 if valid credentials are provided', async () => {
      const { sut, authenticationSpy } = makeSut()
      const httpResponse = await sut.handle(mockRequest())

      expect(httpResponse).toEqual(ok(authenticationSpy.result))
    })

    it('Should return 400 if Validation returns an error', async () => {
      const { sut, validationSpy } = makeSut()
      validationSpy.error = new MissingParamError(faker.random.word())

      const httpResponse = await sut.handle(mockRequest())

      expect(httpResponse).toEqual(badRequest(validationSpy.error))
    })
  })
})
