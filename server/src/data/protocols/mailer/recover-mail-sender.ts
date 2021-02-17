export interface IRecoverMailSender {
  sendRecoverEmail: (name: string, email: string, recoverToken: string) => Promise<void>
}
