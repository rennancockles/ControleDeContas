import { IValidation } from '@/presentation/protocols'
import { InvalidParamError } from '@/presentation/errors'

export class CompareFieldsValidation implements IValidation {
  constructor (
    private readonly fieldName: string,
    private readonly fieldToCompareName: string
  ) {}

  validate (input: any): Error {
    const isValid = input[this.fieldName] === input[this.fieldToCompareName]

    if (!isValid) {
      return new InvalidParamError(this.fieldToCompareName)
    }
  }
}
