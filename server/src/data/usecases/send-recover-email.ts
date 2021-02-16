import { ISendRecoverEmail } from '@/domain/usecases'
import { ICheckUserByEmailRepository, IRecoverMailSender } from '@/data/protocols'

export class SendRecoverEmail implements ISendRecoverEmail {
  constructor (
    private readonly recoverMailSender: IRecoverMailSender,
    private readonly checkUserByEmailRepository: ICheckUserByEmailRepository
  ) {}

  async execute (email: ISendRecoverEmail.Params): Promise<ISendRecoverEmail.Result> {
    const exists = await this.checkUserByEmailRepository.checkByEmail(email)

    if (exists) {
      this.recoverMailSender.send(email)
    }
  }
}
