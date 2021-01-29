import { UserModel } from '@/domain/models'

export interface IGetUserByEmailRepository {
  getByEmail: (email: string) => Promise<IGetUserByEmailRepository.Result>
}

export namespace IGetUserByEmailRepository {
  export type Result = UserModel
}
