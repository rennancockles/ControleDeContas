import { IController, IHttpResponse, IValidation } from '@/presentation/protocols'
import { badRequest, serverError, noContent } from '@/presentation/helpers'
import { ISendRecoverEmail } from '@/domain/usecases'

export class RecoverPasswordController implements IController {
  constructor (
    private readonly sendRecoverEmail: ISendRecoverEmail,
    private readonly validation: IValidation
  ) {}

  async handle (request: RecoverPasswordController.Request): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(request)

      if (error) {
        return badRequest(error)
      }

      await this.sendRecoverEmail.execute(request.email)

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace RecoverPasswordController {
  export type Request = {
    email: string
  }
}
