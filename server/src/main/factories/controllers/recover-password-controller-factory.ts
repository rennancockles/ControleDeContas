import { makeSendRecoverEmailUsecase, makeRecoverPasswordValidation } from '@/main/factories'
import { IController } from '@/presentation/protocols'
import { RecoverPasswordController } from '@/presentation/controllers'

export const makeRecoverPasswordController = (): IController => {
  const controller = new RecoverPasswordController(makeSendRecoverEmailUsecase(), makeRecoverPasswordValidation())
  return controller
}
