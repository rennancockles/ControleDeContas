import { IValidation } from '@/presentation/protocols'
import { InvalidParamError } from '@/presentation/errors'

export class EmailValidation implements IValidation {
  constructor (private readonly fieldName: string) {}

  validate (input: any): Error {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const isValid = re.test(String(input[this.fieldName]).toLowerCase())

    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
