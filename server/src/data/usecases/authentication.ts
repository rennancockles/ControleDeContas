import { IAuthentication } from '@/domain/usecases'
import { IEncrypter, IHashComparer, IGetUserByEmailRepository } from '@/data/protocols'

export class Authentication implements IAuthentication {
  constructor (
    private readonly getUserByEmailRepository: IGetUserByEmailRepository,
    private readonly hashComparer: IHashComparer,
    private readonly encrypter: IEncrypter
  ) {}

  async execute (authenticationParams: IAuthentication.Params): Promise<IAuthentication.Result> {
    const user = await this.getUserByEmailRepository.getByEmail(authenticationParams.email)

    if (user) {
      const isValid = await this.hashComparer.compare(authenticationParams.password, user.password)

      if (isValid) {
        const accessToken = await this.encrypter.encrypt(user.id)

        return {
          accessToken,
          name: user.name
        }
      }
    }

    return null
  }
}
