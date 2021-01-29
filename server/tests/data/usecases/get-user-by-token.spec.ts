import { GetUserByToken } from '@/data/usecases'
import { DecrypterSpy, GetUserByIdRepositorySpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'
import faker from 'faker'

type SutTypes = {
  sut: GetUserByToken
  decrypterSpy: DecrypterSpy
  getUserByIdRepositorySpy: GetUserByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const decrypterSpy = new DecrypterSpy()
  const getUserByIdRepositorySpy = new GetUserByIdRepositorySpy()
  const sut = new GetUserByToken(decrypterSpy, getUserByIdRepositorySpy)

  return {
    sut,
    decrypterSpy,
    getUserByIdRepositorySpy
  }
}

let token: string

describe('GetUserByToken Usecase', () => {
  beforeEach(() => {
    token = faker.random.uuid()
  })

  describe('Decrypter', () => {
    it('Should call Decrypter with correct ciphertext', async () => {
      const { sut, decrypterSpy } = makeSut()

      await sut.execute(token)

      expect(decrypterSpy.ciphertext).toBe(token)
    })

    it('Should return null if Decrypter returns null', async () => {
      const { sut, decrypterSpy } = makeSut()
      decrypterSpy.plaintext = null

      const account = await sut.execute(token)

      expect(account).toBeNull()
    })

    it('Should return null if Decrypter throws', async () => {
      const { sut, decrypterSpy } = makeSut()
      jest.spyOn(decrypterSpy, 'decrypt').mockImplementationOnce(throwError)

      const account = await sut.execute(token)

      expect(account).toBeNull()
    })
  })

  describe('GetUserByIdRepository', () => {
    it('Should call GetUserByIdRepository with correct values', async () => {
      const { sut, decrypterSpy, getUserByIdRepositorySpy } = makeSut()

      await sut.execute(token)

      expect(getUserByIdRepositorySpy.id).toBe(decrypterSpy.plaintext)
    })

    it('Should return null if GetUserByIdRepository returns null', async () => {
      const { sut, getUserByIdRepositorySpy } = makeSut()
      getUserByIdRepositorySpy.result = null

      const user = await sut.execute(token)

      expect(user).toBeNull()
    })

    it('Should throw if GetUserByIdRepository throws', async () => {
      const { sut, getUserByIdRepositorySpy } = makeSut()
      jest.spyOn(getUserByIdRepositorySpy, 'getById').mockImplementationOnce(throwError)

      const promise = sut.execute(token)

      await expect(promise).rejects.toThrow()
    })
  })

  describe('Usecase', () => {
    it('Should return an user on success', async () => {
      const { sut, getUserByIdRepositorySpy } = makeSut()

      const user = await sut.execute(token)

      expect(user).toEqual(getUserByIdRepositorySpy.result)
    })
  })
})
