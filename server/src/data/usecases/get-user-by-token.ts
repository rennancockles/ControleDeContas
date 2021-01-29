import { IGetUserByToken } from '@/domain/usecases'
import { IDecrypter, IGetUserByIdRepository } from '../protocols'

export class GetUserByToken implements IGetUserByToken {
  constructor (
    private readonly decrypter: IDecrypter,
    private readonly getUserByIdRepository: IGetUserByIdRepository
  ) {}

  async execute (accessToken: string): Promise<IGetUserByToken.Result> {
    let id: string

    try {
      id = await this.decrypter.decrypt(accessToken)
    } catch (error) {
      return null
    }

    if (id) {
      const user = await this.getUserByIdRepository.getById(id)
      if (user) {
        return user
      }
    }

    return null
  }
}
