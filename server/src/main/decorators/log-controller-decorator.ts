import { IErrorLogger } from '@/infra/log'
import { IController, IHttpResponse } from '@/presentation/protocols'

export class LogControllerDecorator implements IController {
  constructor (
    private readonly controller: IController,
    private readonly errorLogger: IErrorLogger
  ) {}

  async handle (request: any): Promise<IHttpResponse> {
    const httpResponse = await this.controller.handle(request)

    if (httpResponse.statusCode === 500) {
      this.errorLogger.logError(httpResponse.body.stack)
    }

    return httpResponse
  }
}
