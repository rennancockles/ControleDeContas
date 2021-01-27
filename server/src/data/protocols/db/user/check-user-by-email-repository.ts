export interface ICheckUserByEmailRepository {
  checkByEmail: (email: string) => Promise<ICheckUserByEmailRepository.Result>
}

export namespace ICheckUserByEmailRepository {
  export type Result = boolean
}
