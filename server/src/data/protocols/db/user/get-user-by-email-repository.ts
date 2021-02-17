import { User } from '@/data/entities'

export interface IGetUserByEmailRepository {
  getByEmail: (email: string) => Promise<IGetUserByEmailRepository.Result>
}

export namespace IGetUserByEmailRepository {
  export type Result = User
}
