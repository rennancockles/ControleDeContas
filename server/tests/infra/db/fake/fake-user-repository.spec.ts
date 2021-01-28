import { FakeUserRepository } from '@/infra/db'
import { mockCreateUserParams } from '@/tests/domain/mocks'

import faker from 'faker'

const makeSut = (): FakeUserRepository => {
  return new FakeUserRepository()
}

describe('FakeUser Repository', () => {
  describe('create()', () => {
    it('Should return an account on success', async () => {
      const sut = makeSut()
      const createUserParams = mockCreateUserParams()

      const isValid = await sut.create(createUserParams)

      expect(isValid).toBe(true)
    })
  })

  describe('getByEmail()', () => {
    it('Should return an user on success', async () => {
      const sut = makeSut()

      const account = await sut.getByEmail('rennan@teste.com')

      expect(account).toBeTruthy()
      expect(account.id).toBe('1')
      expect(account.name).toBe('Rennan')
      expect(account.password).toBeTruthy()
    })

    it('Should return null if getByEmail fails', async () => {
      const sut = makeSut()

      const account = await sut.getByEmail(faker.internet.email())

      expect(account).toBeFalsy()
    })
  })

  describe('checkByEmail()', () => {
    test('Should return true if email is valid', async () => {
      const sut = makeSut()

      const exists = await sut.checkByEmail('joao@teste.com')

      expect(exists).toBe(true)
    })

    test('Should return false if email is not valid', async () => {
      const sut = makeSut()

      const exists = await sut.checkByEmail(faker.internet.email())

      expect(exists).toBe(false)
    })
  })
})
