import { UserModel } from '@/domain/models'

export interface IGetUserByToken {
  execute: (accessToken: IGetUserByToken.Params) => Promise<IGetUserByToken.Result>
}

export namespace IGetUserByToken {
  export type Params = string
  export type Result = UserModel
}
