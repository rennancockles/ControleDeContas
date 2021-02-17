import { IMailProvider } from '@/data/protocols'

import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'

export class MailtrapAdapter implements IMailProvider {
  private transporter: Mail

  constructor (credential: IMailProvider.Credential) {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: credential.login,
        pass: credential.password
      }
    })
  }

  async send (message: IMailProvider.Params): Promise<void> {
    await this.transporter.sendMail({
      to: {
        name: message.to.name,
        address: message.to.email
      },
      from: {
        name: message.from.name,
        address: message.from.email
      },
      subject: message.subject,
      html: message.body
    })
  }
}
