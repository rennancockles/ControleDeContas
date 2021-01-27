import { CreateUser } from '@/data/usecases'
import { CheckUserByEmailRepositorySpy, CreateUserRepositorySpy, HasherSpy } from '@/tests/data/mocks'
import { throwError, mockCreateUserParams } from '@/tests/domain/mocks'

type SutTypes = {
  sut: CreateUser
  hasherSpy: HasherSpy
  createUserRepositorySpy: CreateUserRepositorySpy
  checkUserByEmailRepositorySpy: CheckUserByEmailRepositorySpy
}

const makeSut = (): SutTypes => {
  const hasherSpy = new HasherSpy()
  const createUserRepositorySpy = new CreateUserRepositorySpy()
  const checkUserByEmailRepositorySpy = new CheckUserByEmailRepositorySpy()
  const sut = new CreateUser(
    hasherSpy,
    createUserRepositorySpy,
    checkUserByEmailRepositorySpy
  )
  return {
    sut,
    hasherSpy,
    createUserRepositorySpy,
    checkUserByEmailRepositorySpy
  }
}

describe('CreateUser UseCase', () => {
  describe('Hasher', () => {
    it('Should call Hasher with correct values', async () => {
      const { sut, hasherSpy } = makeSut()
      const createUserParams = mockCreateUserParams()

      await sut.execute(createUserParams)

      expect(hasherSpy.plaintext).toBe(createUserParams.password)
    })

    it('Should throw if Hasher throws', async () => {
      const { sut, hasherSpy } = makeSut()
      jest.spyOn(hasherSpy, 'hash').mockImplementationOnce(throwError)

      const promise = sut.execute(mockCreateUserParams())

      await expect(promise).rejects.toThrow()
    })
  })

  describe('CheckUserByEmail Repository', () => {
    it('Should call CheckUserByEmail with correct email', async () => {
      const { sut, checkUserByEmailRepositorySpy } = makeSut()
      const params = mockCreateUserParams()

      await sut.execute(params)

      expect(checkUserByEmailRepositorySpy.email).toBe(params.email)
    })

    it('Should throw if CheckUserByEmail throws', async () => {
      const { sut, checkUserByEmailRepositorySpy } = makeSut()
      jest.spyOn(checkUserByEmailRepositorySpy, 'checkByEmail').mockImplementationOnce(throwError)

      const promise = sut.execute(mockCreateUserParams())

      await expect(promise).rejects.toThrow()
    })
  })

  describe('CreateUser Repository', () => {
    it('Should call CreateUser with correct values', async () => {
      const { sut, createUserRepositorySpy, hasherSpy } = makeSut()
      const params = mockCreateUserParams()

      await sut.execute(params)

      expect(createUserRepositorySpy.params).toEqual({
        name: params.name,
        lastname: params.lastname,
        email: params.email,
        password: hasherSpy.digest
      })
    })

    it('Should throw if CreateUser throws', async () => {
      const { sut, createUserRepositorySpy } = makeSut()
      jest.spyOn(createUserRepositorySpy, 'create').mockImplementationOnce(throwError)

      const promise = sut.execute(mockCreateUserParams())

      await expect(promise).rejects.toThrow()
    })
  })

  describe('UseCase', () => {
    it('Should return false if CheckUserByEmail returns true', async () => {
      const { sut, checkUserByEmailRepositorySpy } = makeSut()
      checkUserByEmailRepositorySpy.result = true

      const isValid = await sut.execute(mockCreateUserParams())

      expect(isValid).toBe(false)
    })

    it('Should return false if CreateUser returns false', async () => {
      const { sut, createUserRepositorySpy } = makeSut()
      createUserRepositorySpy.result = false

      const isValid = await sut.execute(mockCreateUserParams())

      expect(isValid).toBe(false)
    })

    it('Should return true on success', async () => {
      const { sut } = makeSut()

      const isValid = await sut.execute(mockCreateUserParams())

      expect(isValid).toBe(true)
    })
  })
})
