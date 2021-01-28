import { CompareFieldsValidation } from '@/validation'
import { InvalidParamError } from '@/presentation/errors'

import faker from 'faker'

const field = faker.random.word()
const fieldToCompare = faker.random.word()
const makeSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation(field, fieldToCompare)
}

describe('CompareFields Validation', () => {
  it('Should return a InvalidParamError if validation fails', () => {
    const sut = makeSut()

    const error = sut.validate({
      [field]: 'any_value',
      [fieldToCompare]: 'other_value'
    })

    expect(error).toEqual(new InvalidParamError(fieldToCompare))
  })

  it('Should not return if validation succeeds', () => {
    const sut = makeSut()
    const valueToCompare = faker.random.word()

    const error = sut.validate({
      [field]: valueToCompare,
      [fieldToCompare]: valueToCompare
    })

    expect(error).toBeFalsy()
  })
})
