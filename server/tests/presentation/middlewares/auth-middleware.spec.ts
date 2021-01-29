import { AuthMiddleware } from '@/presentation/middlewares'
import { forbidden, ok, serverError } from '@/presentation/helpers'
import { AccessDeniedError } from '@/presentation/errors'
import { GetUserByTokenSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'

const mockRequest = (): AuthMiddleware.Request => ({
  accessToken: 'any_token'
})

type SutTypes = {
  sut: AuthMiddleware
  getUserByTokenSpy: GetUserByTokenSpy
}

const makeSut = (role?: string): SutTypes => {
  const getUserByTokenSpy = new GetUserByTokenSpy()
  const sut = new AuthMiddleware(getUserByTokenSpy, role)

  return {
    sut,
    getUserByTokenSpy
  }
}

describe('Auth Middleware', () => {
  it('Should return 403 if no x-access-token exists in headers', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  it('Should call GetUserByToken with correct accessToken', async () => {
    const role = 'any_role'
    const { sut, getUserByTokenSpy } = makeSut(role)
    const httpRequest = mockRequest()

    await sut.handle(httpRequest)

    expect(getUserByTokenSpy.accessToken).toBe(httpRequest.accessToken)
  })

  it('Should return 403 if GetUserByToken returns null', async () => {
    const { sut, getUserByTokenSpy } = makeSut()
    getUserByTokenSpy.result = null

    const httpResponse = await sut.handle(mockRequest())

    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  it('Should return 200 if GetUserByToken returns an user', async () => {
    const { sut, getUserByTokenSpy } = makeSut()

    const httpResponse = await sut.handle(mockRequest())

    expect(httpResponse).toEqual(ok({
      userId: getUserByTokenSpy.result.id
    }))
  })

  it('Should return 500 if throws', async () => {
    const { sut, getUserByTokenSpy } = makeSut()
    jest.spyOn(getUserByTokenSpy, 'execute').mockImplementationOnce(throwError)

    const httpResponse = await sut.handle(mockRequest())

    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
