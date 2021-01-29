export interface IGetUserByToken {
  execute: (token: string) => Promise<IGetUserByToken.Result>
}

export namespace IGetUserByToken {
  export type Result = {
    id: string
  }
}
