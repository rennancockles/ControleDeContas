import { ValidationComposite, RequiredFieldValidation, CompareFieldsValidation, EmailValidation } from '@/validation'
import { IValidation } from '@/presentation/protocols'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: IValidation[] = []

  for (const field of ['name', 'lastname', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }

  validations.push(new EmailValidation('email'))
  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))

  return new ValidationComposite(validations)
}
