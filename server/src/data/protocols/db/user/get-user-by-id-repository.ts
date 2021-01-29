import { UserModel } from '@/domain/models'

export interface IGetUserByIdRepository {
  getById: (id: string) => Promise<IGetUserByIdRepository.Result>
}

export namespace IGetUserByIdRepository {
  export type Result = UserModel
}
