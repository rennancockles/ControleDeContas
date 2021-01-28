import { SignUpController } from '@/presentation/controllers'
import { badRequest, serverError, forbidden, ok } from '@/presentation/helpers'
import { EmailInUseError, MissingParamError } from '@/presentation/errors'
import { LoginSpy, CreateUserSpy, ValidationSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'

import faker from 'faker'

const mockRequest = (): SignUpController.Request => {
  const password = faker.internet.password()
  return {
    name: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password
  }
}

type SutTypes = {
  sut: SignUpController
  createUserSpy: CreateUserSpy
  loginSpy: LoginSpy
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const createUserSpy = new CreateUserSpy()
  const loginSpy = new LoginSpy()
  const validationSpy = new ValidationSpy()
  const sut = new SignUpController(loginSpy, createUserSpy, validationSpy)
  return {
    sut,
    createUserSpy,
    loginSpy,
    validationSpy
  }
}

describe('SignUp Controller', () => {
  describe('CreateUser UseCase', () => {
    it('Should call CreateUser with correct values', async () => {
      const { sut, createUserSpy } = makeSut()
      const request = mockRequest()

      await sut.handle(request)

      expect(createUserSpy.params).toEqual({
        name: request.name,
        lastname: request.lastname,
        email: request.email,
        password: request.password
      })
    })

    it('Should return 403 if CreateUser returns false', async () => {
      const { sut, createUserSpy } = makeSut()
      createUserSpy.result = false

      const httpResponse = await sut.handle(mockRequest())

      expect(httpResponse).toEqual(forbidden(new EmailInUseError()))
    })

    it('Should return 500 if CreateUser throws', async () => {
      const { sut, createUserSpy } = makeSut()
      jest.spyOn(createUserSpy, 'execute').mockImplementationOnce(throwError)

      const httpResponse = await sut.handle(mockRequest())

      expect(httpResponse).toEqual(serverError(new Error()))
    })
  })

  describe('Login UseCase', () => {
    it('Should call Login with correct values', async () => {
      const { sut, loginSpy } = makeSut()
      const request = mockRequest()

      await sut.handle(request)

      expect(loginSpy.params).toEqual({
        email: request.email,
        password: request.password
      })
    })

    it('Should return 500 if Login throws', async () => {
      const { sut, loginSpy } = makeSut()
      jest.spyOn(loginSpy, 'execute').mockImplementationOnce(throwError)

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

    it('Should return 200 if valid data is provided', async () => {
      const { sut, loginSpy } = makeSut()
      const httpResponse = await sut.handle(mockRequest())

      expect(httpResponse).toEqual(ok(loginSpy.result))
    })

    it('Should return 400 if Validation returns an error', async () => {
      const { sut, validationSpy } = makeSut()
      validationSpy.error = new MissingParamError(faker.random.word())

      const httpResponse = await sut.handle(mockRequest())

      expect(httpResponse).toEqual(badRequest(validationSpy.error))
    })
  })
})
