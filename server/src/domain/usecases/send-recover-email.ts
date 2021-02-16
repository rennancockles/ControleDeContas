export interface ISendRecoverEmail {
  execute: (email: ISendRecoverEmail.Params) => Promise<ISendRecoverEmail.Result>
}

export namespace ISendRecoverEmail {
  export type Params = string
  export type Result = void
}
