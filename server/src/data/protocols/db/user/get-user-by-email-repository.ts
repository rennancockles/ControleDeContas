export interface IGetUserByEmailRepository {
  getByEmail: (email: string) => Promise<IGetUserByEmailRepository.Result>
}

export namespace IGetUserByEmailRepository {
  export type Result = {
    id: string
    name: string
    password: string
  }
}
