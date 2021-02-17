type MailAddress = {
  name: string
  email: string
}

type MailMessage = {
  to: MailAddress
  from: MailAddress
  subject: string
  body: string
}

type MailCredential = {
  login: string
  password: string
}

export interface IMailProvider {
  send: (email: IMailProvider.Params) => Promise<IMailProvider.Result>
}

export namespace IMailProvider {
  export type Credential = MailCredential
  export type Params = MailMessage
  export type Result = void
}
