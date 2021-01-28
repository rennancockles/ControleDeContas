import { ICheckUserByEmailRepository, ICreateUserRepository, IGetUserByEmailRepository } from '@/data/protocols'

import { hash } from 'bcrypt'
import faker from 'faker'

const usersMock = [
  {
    id: '1',
    name: 'Rennan',
    lastname: 'Cockles',
    email: 'rennan@teste.com',
    password: '123456'
  },
  {
    id: '2',
    name: 'João',
    lastname: 'Ninguém',
    email: 'joao@teste.com',
    password: '123'
  }
]

export class FakeUserRepository implements IGetUserByEmailRepository, ICreateUserRepository, ICheckUserByEmailRepository {
  email: string

  async getByEmail (email: string): Promise<IGetUserByEmailRepository.Result> {
    this.email = email
    let user = usersMock.find(user => user.email === email)
    if (user) {
      const hashedPassword = await hash(user.password, 12)
      user = { ...user, password: hashedPassword }
    }
    return user
  }

  async create (userData: ICreateUserRepository.Params): Promise<ICreateUserRepository.Result> {
    const id = faker.random.uuid()
    usersMock.push({ ...userData, id })
    return true
  }

  async checkByEmail (email: string): Promise<ICheckUserByEmailRepository.Result> {
    const user = await this.getByEmail(email)

    return Boolean(user)
  }
}
