import { ErrorLoggerComposite, IErrorLogger } from '@/infra/log'
import { LogControllerDecorator } from '@/main/decorators'
import { IController } from '@/presentation/protocols'

export const makeLogControllerDecorator = (controller: IController): IController => {
  const loggers:IErrorLogger[] = []

  return new LogControllerDecorator(controller, new ErrorLoggerComposite(loggers))
}
