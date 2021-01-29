import { IHttpResponse, IMiddleware } from '@/presentation/protocols'
import { forbidden, ok, serverError } from '@/presentation/helpers'
import { AccessDeniedError } from '@/presentation/errors'
import { IGetUserByToken } from '@/domain/usecases'

export class AuthMiddleware implements IMiddleware {
  constructor (
    private readonly getUserByToken: IGetUserByToken,
    private readonly role?: string
  ) {}

  async handle (request: AuthMiddleware.Request): Promise<IHttpResponse> {
    try {
      const { accessToken } = request
      if (accessToken) {
        const user = await this.getUserByToken.execute(accessToken)
        if (user) {
          return ok({ userId: user.id })
        }
      }
      return forbidden(new AccessDeniedError())
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace AuthMiddleware {
  export type Request = {
    accessToken?: string
  }
}
