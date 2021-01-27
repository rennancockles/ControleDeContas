import { Login } from '@/data/usecases'
import { HashComparerSpy, EncrypterSpy, GetUserByEmailRepositorySpy } from '@/tests/data/mocks'
import { throwError, mockLoginParams } from '@/tests/domain/mocks'

type SutTypes = {
  sut: Login
  getUserByEmailRepositorySpy: GetUserByEmailRepositorySpy
  hashComparerSpy: HashComparerSpy
  encrypterSpy: EncrypterSpy
}

const makeSut = (): SutTypes => {
  const getUserByEmailRepositorySpy = new GetUserByEmailRepositorySpy()
  const hashComparerSpy = new HashComparerSpy()
  const encrypterSpy = new EncrypterSpy()
  const sut = new Login(
    getUserByEmailRepositorySpy,
    hashComparerSpy,
    encrypterSpy
  )
  return {
    sut,
    getUserByEmailRepositorySpy,
    hashComparerSpy,
    encrypterSpy
  }
}

describe('Login UseCase', () => {
  describe('GetUserByEmail Repository', () => {
    it('Should call GetUserByEmailRepository with correct email', async () => {
      const { sut, getUserByEmailRepositorySpy } = makeSut()
      const authenticationParams = mockLoginParams()

      await sut.execute(authenticationParams)

      expect(getUserByEmailRepositorySpy.email).toBe(authenticationParams.email)
    })

    it('Should throw if GetUserByEmailRepository throws', async () => {
      const { sut, getUserByEmailRepositorySpy } = makeSut()
      jest.spyOn(getUserByEmailRepositorySpy, 'getByEmail').mockImplementationOnce(throwError)

      const promise = sut.execute(mockLoginParams())

      await expect(promise).rejects.toThrow()
    })

    it('Should return null if GetUserByEmailRepository returns null', async () => {
      const { sut, getUserByEmailRepositorySpy } = makeSut()
      getUserByEmailRepositorySpy.result = null

      const model = await sut.execute(mockLoginParams())

      expect(model).toBeNull()
    })
  })

  describe('HashComparer', () => {
    it('Should call HashComparer with correct values', async () => {
      const { sut, hashComparerSpy, getUserByEmailRepositorySpy } = makeSut()
      const authenticationParams = mockLoginParams()

      await sut.execute(authenticationParams)

      expect(hashComparerSpy.plaintext).toBe(authenticationParams.password)
      expect(hashComparerSpy.digest).toBe(getUserByEmailRepositorySpy.result.password)
    })

    it('Should throw if HashComparer throws', async () => {
      const { sut, hashComparerSpy } = makeSut()
      jest.spyOn(hashComparerSpy, 'compare').mockImplementationOnce(throwError)

      const promise = sut.execute(mockLoginParams())

      await expect(promise).rejects.toThrow()
    })

    it('Should return null if HashComparer returns false', async () => {
      const { sut, hashComparerSpy } = makeSut()
      hashComparerSpy.isValid = false

      const model = await sut.execute(mockLoginParams())

      expect(model).toBeNull()
    })
  })

  describe('Encrypter', () => {
    it('Should call Encrypter with correct plaintext', async () => {
      const { sut, encrypterSpy, getUserByEmailRepositorySpy } = makeSut()

      await sut.execute(mockLoginParams())

      expect(encrypterSpy.plaintext).toBe(getUserByEmailRepositorySpy.result.id)
    })

    it('Should throw if Encrypter throws', async () => {
      const { sut, encrypterSpy } = makeSut()
      jest.spyOn(encrypterSpy, 'encrypt').mockImplementationOnce(throwError)

      const promise = sut.execute(mockLoginParams())

      await expect(promise).rejects.toThrow()
    })
  })

  describe('UseCase', () => {
    it('Should return an data on success', async () => {
      const { sut, encrypterSpy, getUserByEmailRepositorySpy } = makeSut()

      const { accessToken, name } = await sut.execute(mockLoginParams())

      expect(accessToken).toBe(encrypterSpy.ciphertext)
      expect(name).toBe(getUserByEmailRepositorySpy.result.name)
    })
  })
})
