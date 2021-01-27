import { ILogin } from '@/domain/usecases'
import { IEncrypter, IHashComparer, IGetUserByEmailRepository } from '@/data/protocols'

export class Login implements ILogin {
  constructor (
    private readonly getUserByEmailRepository: IGetUserByEmailRepository,
    private readonly hashComparer: IHashComparer,
    private readonly encrypter: IEncrypter
  ) {}

  async execute (loginParams: ILogin.Params): Promise<ILogin.Result> {
    const user = await this.getUserByEmailRepository.getByEmail(loginParams.email)

    if (user) {
      const isValid = await this.hashComparer.compare(loginParams.password, user.password)

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
