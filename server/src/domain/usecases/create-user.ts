import { UserModel } from '@/domain/models'

export interface ICreateUser {
  execute: (user: ICreateUser.Params) => Promise<ICreateUser.Result>
}

export namespace ICreateUser {
  export type Params = Omit<UserModel, 'id'>
  export type Result = boolean
}
