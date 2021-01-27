import { makeLoginValidation } from '@/main/factories'
import { ValidationComposite, RequiredFieldValidation, EmailValidation } from '@/validation'
import { IValidation } from '@/presentation/protocols'

jest.mock('@/validation/validation-composite')

describe('LoginValidation Factory', () => {
  it('Should call ValidationComposite with all validations', () => {
    makeLoginValidation()

    const validations: IValidation[] = []

    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }

    validations.push(new EmailValidation('email'))

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
