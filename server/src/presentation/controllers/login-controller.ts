import { IController, IHttpResponse, IValidation } from '@/presentation/protocols'
import { badRequest, serverError, unauthorized, ok } from '@/presentation/helpers'
import { ILogin } from '@/domain/usecases'

export class LoginController implements IController {
  constructor (
    private readonly login: ILogin,
    private readonly validation: IValidation
  ) {}

  async handle (request: LoginController.Request): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(request)

      if (error) {
        return badRequest(error)
      }

      const authenticationModel = await this.login.execute(request)

      if (!authenticationModel) {
        return unauthorized()
      }

      return ok(authenticationModel)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoginController {
  export type Request = {
    email: string
    password: string
  }
}
