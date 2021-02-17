import { ISendRecoverEmail } from '@/domain/usecases'
import { IEncrypter, IGetUserByEmailRepository, IRecoverMailSender } from '@/data/protocols'

export class SendRecoverEmail implements ISendRecoverEmail {
  constructor (
    private readonly recoverMailSender: IRecoverMailSender,
    private readonly getUserByEmailRepository: IGetUserByEmailRepository,
    private readonly encrypter: IEncrypter
  ) {}

  async execute (email: ISendRecoverEmail.Params): Promise<ISendRecoverEmail.Result> {
    const user = await this.getUserByEmailRepository.getByEmail(email)

    if (user) {
      const recoverObj = {
        email,
        action: 'recover',
        createdAt: new Date().valueOf(),
        validHours: 24
      }
      const recoverToken = await this.encrypter.encrypt(JSON.stringify(recoverObj))

      this.recoverMailSender.sendRecoverEmail(user.fullname, user.email, recoverToken)
    }
  }
}
