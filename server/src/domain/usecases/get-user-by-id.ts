import { UserModel } from '@/domain/models'

export interface IGetUserById {
  execute: (id: IGetUserById.Params) => Promise<IGetUserById.Result>
}

export namespace IGetUserById {
  export type Params = string
  export type Result = UserModel
}
