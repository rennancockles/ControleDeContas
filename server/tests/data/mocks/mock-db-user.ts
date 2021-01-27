import { ICheckUserByEmailRepository, ICreateUserRepository, IGetUserByEmailRepository } from '@/data/protocols'

import faker from 'faker'

export class GetUserByEmailRepositorySpy implements IGetUserByEmailRepository {
  email: string
  result = {
    id: faker.random.uuid(),
    name: faker.name.findName(),
    password: faker.internet.password()
  }

  async getByEmail (email: string): Promise<IGetUserByEmailRepository.Result> {
    this.email = email
    return this.result
  }
}

export class CheckUserByEmailRepositorySpy implements ICheckUserByEmailRepository {
  email: string
  result = false

  async checkByEmail (email: string): Promise<ICheckUserByEmailRepository.Result> {
    this.email = email
    return this.result
  }
}

export class CreateUserRepositorySpy implements ICreateUserRepository {
  params: ICreateUserRepository.Params
  result = true

  async create (params: ICreateUserRepository.Params): Promise<ICreateUserRepository.Result> {
    this.params = params
    return this.result
  }
}
