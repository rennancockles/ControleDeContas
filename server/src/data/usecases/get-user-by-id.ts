import { IGetUserById } from '@/domain/usecases'
import { IGetUserByIdRepository } from '@/data/protocols'

export class GetUserById implements IGetUserById {
  constructor (private readonly getUserByIdRepository: IGetUserByIdRepository) {}

  async execute (id: string): Promise<IGetUserById.Result> {
    return this.getUserByIdRepository.getById(id)
  }
}
