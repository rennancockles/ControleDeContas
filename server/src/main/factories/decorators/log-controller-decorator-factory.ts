import { LogControllerDecorator } from '@/main/decorators'
import { IController } from '@/presentation/protocols'

export const makeLogControllerDecorator = (controller: IController): IController => {
  return new LogControllerDecorator(controller)
}
