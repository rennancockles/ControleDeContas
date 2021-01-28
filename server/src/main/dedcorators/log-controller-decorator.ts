import { IController, IHttpResponse } from '@/presentation/protocols'

export class LogControllerDecorator implements IController {
  constructor (private readonly controller: IController) {}

  async handle (request: any): Promise<IHttpResponse> {
    const httpResponse = await this.controller.handle(request)

    if (httpResponse.statusCode === 500) {
      // log error
    }

    return httpResponse
  }
}
