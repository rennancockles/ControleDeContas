import { IRecoverMailSender } from '@/data/protocols'

export class RecoverMailSenderSpy implements IRecoverMailSender {
  name: string
  email: string
  recoverUrl: string
  executionAmount: number = 0

  async sendRecoverEmail (name: string, email: string, recoverUrl: string): Promise<void> {
    this.name = name
    this.email = email
    this.recoverUrl = recoverUrl
    this.executionAmount += 1
  }
}
