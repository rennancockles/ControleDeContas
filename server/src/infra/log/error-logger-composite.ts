import { IErrorLogger } from '@/infra/log'

export class ErrorLoggerComposite implements IErrorLogger {
  constructor (private readonly loggers: IErrorLogger[]) {}

  async logError (stack: string): Promise<void> {
    for (const logger of this.loggers) {
      logger.logError(stack)
    }
  }
}
