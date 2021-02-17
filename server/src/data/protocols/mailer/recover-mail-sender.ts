export interface IRecoverMailSender {
  sendRecoverEmail: (name: string, email: string, recoverUrl: string) => Promise<void>
}
