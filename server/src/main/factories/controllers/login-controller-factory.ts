// import { makeDbAuthentication, makeLoginValidation, makeLogControllerDecorator } from '@/main/factories'
import { makeLoginUsecase, makeLoginValidation } from '@/main/factories'
import { IController } from '@/presentation/protocols'
import { LoginController } from '@/presentation/controllers'

export const makeLoginController = (): IController => {
  const controller = new LoginController(makeLoginUsecase(), makeLoginValidation())
  // return makeLogControllerDecorator(controller)
  return controller
}
