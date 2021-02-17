import { User } from '@/data/entities'

export interface IGetUserByIdRepository {
  getById: (id: string) => Promise<IGetUserByIdRepository.Result>
}

export namespace IGetUserByIdRepository {
  export type Result = User
}
