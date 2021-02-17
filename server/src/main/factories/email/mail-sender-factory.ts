import { MailSender } from '@/main/email'
import { MailtrapAdapter } from '@/infra/mail-provider'
import env from '@/main/config/env'

export const makeMailSender = (): any => {
  const credential = {
    login: env.emailLogin,
    password: env.emailPassword
  }
  const mailProvider = new MailtrapAdapter(credential)

  return new MailSender(mailProvider)
}
