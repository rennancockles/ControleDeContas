import { SendRecoverEmail } from '@/data/usecases'
import { CheckUserByEmailRepositorySpy, RecoverMailSenderSpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'

import faker from 'faker'

type SutTypes = {
  sut: SendRecoverEmail
  recoverMailSenderSpy: RecoverMailSenderSpy
  checkUserByEmailRepositorySpy: CheckUserByEmailRepositorySpy
}

const makeSut = (): SutTypes => {
  const recoverMailSenderSpy = new RecoverMailSenderSpy()
  const checkUserByEmailRepositorySpy = new CheckUserByEmailRepositorySpy()
  const sut = new SendRecoverEmail(
    recoverMailSenderSpy,
    checkUserByEmailRepositorySpy
  )
  return {
    sut,
    recoverMailSenderSpy,
    checkUserByEmailRepositorySpy
  }
}

let email: string

describe('SendRecoverEmail UseCase', () => {
  beforeEach(() => {
    email = faker.internet.email()
  })

  describe('CheckUserByEmail Repository', () => {
    it('Should call CheckUserByEmail with correct email', async () => {
      const { sut, checkUserByEmailRepositorySpy } = makeSut()

      await sut.execute(email)

      expect(checkUserByEmailRepositorySpy.email).toBe(email)
    })

    it('Should throw if CheckUserByEmail throws', async () => {
      const { sut, checkUserByEmailRepositorySpy } = makeSut()
      jest.spyOn(checkUserByEmailRepositorySpy, 'checkByEmail').mockImplementationOnce(throwError)

      const promise = sut.execute(email)

      await expect(promise).rejects.toThrow()
    })
  })

  describe('RecoverMailSender', () => {
    it('Should not call RecoverMailSender if email does not exists', async () => {
      const { sut, recoverMailSenderSpy, checkUserByEmailRepositorySpy } = makeSut()
      checkUserByEmailRepositorySpy.result = false

      await sut.execute(email)

      expect(recoverMailSenderSpy.executionAmount).toBe(0)
    })

    it('Should call RecoverMailSender if email exists', async () => {
      const { sut, recoverMailSenderSpy, checkUserByEmailRepositorySpy } = makeSut()
      checkUserByEmailRepositorySpy.result = true

      await sut.execute(email)

      expect(recoverMailSenderSpy.executionAmount).toBe(1)
    })

    it('Should call RecoverMailSender with correct email', async () => {
      const { sut, recoverMailSenderSpy, checkUserByEmailRepositorySpy } = makeSut()
      checkUserByEmailRepositorySpy.result = true

      await sut.execute(email)

      expect(recoverMailSenderSpy.email).toBe(email)
    })

    it('Should throw if RecoverMailSender throws', async () => {
      const { sut, recoverMailSenderSpy, checkUserByEmailRepositorySpy } = makeSut()
      checkUserByEmailRepositorySpy.result = true
      jest.spyOn(recoverMailSenderSpy, 'send').mockImplementationOnce(throwError)

      const promise = sut.execute(email)

      await expect(promise).rejects.toThrow()
    })
  })
})
