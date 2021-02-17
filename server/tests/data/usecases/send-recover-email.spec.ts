import { SendRecoverEmail } from '@/data/usecases'
import { EncrypterSpy, GetUserByEmailRepositorySpy, RecoverMailSenderSpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'

import faker from 'faker'

type SutTypes = {
  sut: SendRecoverEmail
  recoverMailSenderSpy: RecoverMailSenderSpy
  getUserByEmailRepositorySpy: GetUserByEmailRepositorySpy
  encrypterSpy: EncrypterSpy
}

const makeSut = (): SutTypes => {
  const recoverMailSenderSpy = new RecoverMailSenderSpy()
  const getUserByEmailRepositorySpy = new GetUserByEmailRepositorySpy()
  const encrypterSpy = new EncrypterSpy()
  const sut = new SendRecoverEmail(
    recoverMailSenderSpy,
    getUserByEmailRepositorySpy,
    encrypterSpy
  )
  return {
    sut,
    recoverMailSenderSpy,
    getUserByEmailRepositorySpy,
    encrypterSpy
  }
}

let email: string

describe('SendRecoverEmail UseCase', () => {
  beforeEach(() => {
    email = faker.internet.email()
  })

  describe('GetUserByEmail Repository', () => {
    it('Should call GetUserByEmailRepository with correct email', async () => {
      const { sut, getUserByEmailRepositorySpy } = makeSut()

      await sut.execute(email)

      expect(getUserByEmailRepositorySpy.email).toBe(email)
    })

    it('Should throw if GetUserByEmailRepository throws', async () => {
      const { sut, getUserByEmailRepositorySpy } = makeSut()
      jest.spyOn(getUserByEmailRepositorySpy, 'getByEmail').mockImplementationOnce(throwError)

      const promise = sut.execute(email)

      await expect(promise).rejects.toThrow()
    })

    it('Should pass if GetUserByEmailRepository returns null', async () => {
      const { sut, getUserByEmailRepositorySpy } = makeSut()
      getUserByEmailRepositorySpy.result = null

      const promise = sut.execute(email)

      await expect(promise).resolves.not.toThrow()
    })
  })

  describe('Encrypter', () => {
    it('Should throw if Encrypter throws', async () => {
      const { sut, encrypterSpy } = makeSut()
      jest.spyOn(encrypterSpy, 'encrypt').mockImplementationOnce(throwError)

      const promise = sut.execute(email)

      await expect(promise).rejects.toThrow()
    })
  })

  describe('RecoverMailSender', () => {
    it('Should not call RecoverMailSender if email does not exists', async () => {
      const { sut, recoverMailSenderSpy, getUserByEmailRepositorySpy } = makeSut()
      getUserByEmailRepositorySpy.result = null

      await sut.execute(email)

      expect(recoverMailSenderSpy.executionAmount).toBe(0)
    })

    it('Should call RecoverMailSender if email exists', async () => {
      const { sut, recoverMailSenderSpy } = makeSut()

      await sut.execute(email)

      expect(recoverMailSenderSpy.executionAmount).toBe(1)
    })

    it('Should call RecoverMailSender with correct params', async () => {
      const { sut, recoverMailSenderSpy, getUserByEmailRepositorySpy, encrypterSpy } = makeSut()

      await sut.execute(email)

      const name = `${getUserByEmailRepositorySpy.result.name.charAt(0).toUpperCase()}${getUserByEmailRepositorySpy.result.name.toLowerCase().slice(1)}`
      const lastname = `${getUserByEmailRepositorySpy.result.lastname.charAt(0).toUpperCase()}${getUserByEmailRepositorySpy.result.lastname.toLowerCase().slice(1)}`
      const fullName = `${name} ${lastname}`

      expect(recoverMailSenderSpy.email).toBe(getUserByEmailRepositorySpy.result.email)
      expect(recoverMailSenderSpy.name).toBe(fullName)
      expect(recoverMailSenderSpy.recoverToken).toBe(encrypterSpy.ciphertext)
    })

    it('Should throw if RecoverMailSender throws', async () => {
      const { sut, recoverMailSenderSpy } = makeSut()
      jest.spyOn(recoverMailSenderSpy, 'sendRecoverEmail').mockImplementationOnce(throwError)

      const promise = sut.execute(email)

      await expect(promise).rejects.toThrow()
    })
  })
})
