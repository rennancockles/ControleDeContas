export interface ICreateUser {
  execute: (user: ICreateUser.Params) => Promise<ICreateUser.Result>
}

export namespace ICreateUser {
  export type Params = {
    name: string
    lastname: string
    email: string
    password: string
  }

  export type Result = boolean
}
