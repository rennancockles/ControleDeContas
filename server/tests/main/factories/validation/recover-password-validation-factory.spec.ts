import { makeRecoverPasswordValidation } from '@/main/factories'
import { ValidationComposite, RequiredFieldValidation, EmailValidation } from '@/validation'
import { IValidation } from '@/presentation/protocols'

jest.mock('@/validation/validation-composite')

describe('RecoverPasswordValidation Factory', () => {
  it('Should call ValidationComposite with all validations', () => {
    makeRecoverPasswordValidation()

    const validations: IValidation[] = []

    for (const field of ['email']) {
      validations.push(new RequiredFieldValidation(field))
    }

    validations.push(new EmailValidation('email'))

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
