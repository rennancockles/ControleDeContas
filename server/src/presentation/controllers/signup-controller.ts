import { IController, IHttpResponse, IValidation } from '@/presentation/protocols'
import { badRequest, serverError, ok, forbidden } from '@/presentation/helpers'
import { ILogin, ICreateUser } from '@/domain/usecases'
import { EmailInUseError } from '../errors'

export class SignUpController implements IController {
  constructor (
    private readonly login: ILogin,
    private readonly createUser: ICreateUser,
    private readonly validation: IValidation
  ) {}

  async handle (request: SignUpController.Request): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(request)

      if (error) {
        return badRequest(error)
      }

      const { name, lastname, email, password } = request
      const isValid = await this.createUser.execute({
        name,
        lastname,
        email,
        password
      })

      if (!isValid) {
        return forbidden(new EmailInUseError())
      }

      const authenticationModel = await this.login.execute({
        email,
        password
      })

      return ok(authenticationModel)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace SignUpController {
  export type Request = {
    name: string
    lastname: string
    email: string
    password: string
    passwordConfirmation: string
  }
}
