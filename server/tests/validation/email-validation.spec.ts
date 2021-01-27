import { EmailValidation } from '@/validation'
import { InvalidParamError } from '@/presentation/errors'

import faker from 'faker'

const field = faker.random.word()
const makeSut = (): EmailValidation => {
  return new EmailValidation(field)
}

describe('Email Validation', () => {
  it('Should return a InvalidParamError if validation fails', () => {
    const sut = makeSut()

    const error = sut.validate({ [field]: faker.random.word() })

    expect(error).toEqual(new InvalidParamError(field))
  })

  it('Should not return if validation succeeds', () => {
    const sut = makeSut()

    const error = sut.validate({ [field]: faker.internet.email() })

    expect(error).toBeFalsy()
  })
})
