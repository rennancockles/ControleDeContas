import { CryptoAdapter } from '@/infra/encryption'
import { throwError } from '@/tests/domain/mocks'

import crypto from 'crypto'

jest.mock('crypto', () => ({
  createCipheriv (): any {
    return {
      update: () => {
        return Buffer.from('any_token')
      },
      final: () => {
        return Buffer.from('final')
      }
    }
  },

  createDecipheriv (): any {
    return {
      update: () => {
        return Buffer.from('any_value')
      },
      final: () => {
        return Buffer.from('final')
      }
    }
  }
}))

const cryptoAlg = 'aes-256-cbc'
const cryptoKey = '00ff'
const cryptoIV = '4567'
const makeSut = (): CryptoAdapter => {
  return new CryptoAdapter(cryptoAlg, cryptoKey, cryptoIV)
}

describe('Crypto Adapter', () => {
  describe('encrypt()', () => {
    it('Should call createCipheriv with correct values', async () => {
      const sut = makeSut()
      const createCipherivSpy = jest.spyOn(crypto, 'createCipheriv')

      await sut.encrypt('any_id')

      expect(createCipherivSpy).toHaveBeenCalledWith(cryptoAlg, Buffer.from(cryptoKey, 'hex'), Buffer.from(cryptoIV, 'hex'))
    })

    it('Should return a token on encrypt success', async () => {
      const sut = makeSut()
      const encrypted = await sut.encrypt('any_id')

      expect(encrypted).toBe(Buffer.from('any_tokenfinal').toString('hex'))
    })

    it('Should throw if createCipheriv throws', async () => {
      const sut = makeSut()
      jest.spyOn(crypto, 'createCipheriv').mockImplementationOnce(throwError)

      const promise = sut.encrypt('any_id')

      await expect(promise).rejects.toThrow()
    })
  })

  describe('decrypt()', () => {
    it('Should call createDecipheriv with correct values', async () => {
      const sut = makeSut()
      const createDecipherivSpy = jest.spyOn(crypto, 'createDecipheriv')

      await sut.decrypt('any_token')

      expect(createDecipherivSpy).toHaveBeenCalledWith(cryptoAlg, Buffer.from(cryptoKey, 'hex'), Buffer.from(cryptoIV, 'hex'))
    })

    it('Should return a value on createDecipheriv success', async () => {
      const sut = makeSut()
      const value = await sut.decrypt('any_token')

      expect(value).toBe(Buffer.from('any_valuefinal').toString())
    })

    it('Should throw if createDecipheriv throws', async () => {
      const sut = makeSut()
      jest.spyOn(crypto, 'createDecipheriv').mockImplementationOnce(throwError)

      const promise = sut.decrypt('any_token')

      await expect(promise).rejects.toThrow()
    })
  })
})
