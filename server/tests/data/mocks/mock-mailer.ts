import { IRecoverMailSender } from '@/data/protocols'

export class RecoverMailSenderSpy implements IRecoverMailSender {
  email: string
  executionAmount: number = 0

  async send (email: string): Promise<void> {
    this.email = email
    this.executionAmount += 1
  }
}
