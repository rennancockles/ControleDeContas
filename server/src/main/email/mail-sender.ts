import { IMailProvider, IRecoverMailSender } from '@/data/protocols'
import env from '@/main/config/env'

import fs from 'fs'
import path from 'path'

export class MailSender implements IRecoverMailSender {
  private appName: string = 'Controle de Contas'

  constructor (private readonly mailProvider: IMailProvider) {}

  async sendRecoverEmail (name: string, email: string, recoverToken: string): Promise<void> {
    fs.readFile(path.resolve(__dirname, 'templates', 'recover-password.html'), 'utf8', (err, data) => {
      if (err) throw err

      const url = `${env.client_url}/recover/${recoverToken}`
      const body = data.replace(/@Name/g, name).replace(/@Url/g, url).replace(/@App/g, this.appName)

      const mailMessage: IMailProvider.Params = {
        to: {
          name,
          email
        },
        from: {
          name: this.appName,
          email: env.emailFrom
        },
        subject: 'Solicitação de alteração da senha de acesso',
        body
      }

      this.mailProvider.send(mailMessage)
    })
  }
}
