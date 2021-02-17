import { IRecoverMailSender } from '@/data/protocols'

export class RecoverMailSenderSpy implements IRecoverMailSender {
  name: string
  email: string
  recoverToken: string
  executionAmount: number = 0

  async sendRecoverEmail (name: string, email: string, recoverToken: string): Promise<void> {
    this.name = name
    this.email = email
    this.recoverToken = recoverToken
    this.executionAmount += 1
  }
}
