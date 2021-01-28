import { makeSignUpValidation } from '@/main/factories'
import { ValidationComposite, RequiredFieldValidation, CompareFieldsValidation, EmailValidation } from '@/validation'
import { IValidation } from '@/presentation/protocols'

jest.mock('@/validation/validation-composite')

describe('SignUpValidation Factory', () => {
  it('Should call ValidationComposite with all validations', () => {
    makeSignUpValidation()

    const validations: IValidation[] = []

    for (const field of ['name', 'lastname', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }

    validations.push(new EmailValidation('email'))
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
