import { SignUpController } from '@/presentation/controllers'
import { IController } from '@/presentation/protocols'
import { makeAuthenticationUsecase, makeCreateUserUsecase, makeSignUpValidation } from '@/main/factories'

export const makeSignUpController = (): IController => {
  const controller = new SignUpController(makeAuthenticationUsecase(), makeCreateUserUsecase(), makeSignUpValidation())
  return controller
}
