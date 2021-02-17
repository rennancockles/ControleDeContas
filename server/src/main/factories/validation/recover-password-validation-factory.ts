import { ValidationComposite, RequiredFieldValidation, EmailValidation } from '@/validation'
import { IValidation } from '@/presentation/protocols'

export const makeRecoverPasswordValidation = (): ValidationComposite => {
  const validations: IValidation[] = []

  for (const field of ['email']) {
    validations.push(new RequiredFieldValidation(field))
  }

  validations.push(new EmailValidation('email'))

  return new ValidationComposite(validations)
}
