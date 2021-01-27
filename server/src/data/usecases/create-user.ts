import { ICreateUser } from '@/domain/usecases'
import { ICheckUserByEmailRepository, ICreateUserRepository } from '@/data/protocols/db'
import { IHasher } from '@/data/protocols'

export class CreateUser implements ICreateUser {
  constructor (
    private readonly hasher: IHasher,
    private readonly createUserRepository: ICreateUserRepository,
    private readonly checkUserByEmailRepository: ICheckUserByEmailRepository
  ) {}

  async execute (userData: ICreateUser.Params): Promise<ICreateUser.Result> {
    const exists = await this.checkUserByEmailRepository.checkByEmail(userData.email)
    let isvalid = false

    if (!exists) {
      const hashedPassword = await this.hasher.hash(userData.password)
      isvalid = await this.createUserRepository.create({ ...userData, password: hashedPassword })
    }

    return isvalid
  }
}
