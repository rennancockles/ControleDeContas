import { ICheckUserByEmailRepository, ICreateUserRepository, IGetUserByEmailRepository, IGetUserByIdRepository } from '@/data/protocols'
import { User } from '@/data/entities'

import faker from 'faker'

export class GetUserByEmailRepositorySpy implements IGetUserByEmailRepository {
  email: string
  result = new User({
    id: faker.random.uuid(),
    name: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: '',
    password: faker.internet.password()
  })

  async getByEmail (email: string): Promise<IGetUserByEmailRepository.Result> {
    this.email = email
    if (this.result) {
      this.result.email = email
    }
    return this.result
  }
}

export class GetUserByIdRepositorySpy implements IGetUserByIdRepository {
  id: string
  result = new User({
    id: faker.random.uuid(),
    name: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  })

  async getById (id: string): Promise<IGetUserByIdRepository.Result> {
    this.id = id
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
