export interface ILogin {
  execute: (loginParams: ILogin.Params) => Promise<ILogin.Result>
}

export namespace ILogin {
  export type Params = {
    email: string
    password: string
  }

  export type Result = {
    accessToken: string
    name: string
  }
}
