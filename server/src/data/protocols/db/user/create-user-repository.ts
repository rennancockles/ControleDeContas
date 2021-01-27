import { ICreateUser } from '@/domain/usecases'

export interface ICreateUserRepository {
  create: (userData: ICreateUserRepository.Params) => Promise<ICreateUserRepository.Result>
}

export namespace ICreateUserRepository {
  export type Params = ICreateUser.Params
  export type Result = boolean
}
