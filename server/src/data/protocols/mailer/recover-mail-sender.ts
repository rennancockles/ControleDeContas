export interface IRecoverMailSender {
  send: (email: string) => Promise<void>
}
