import { User } from '@/data/entities'
import { ICheckUserByEmailRepository, ICreateUserRepository, IGetUserByEmailRepository, IGetUserByIdRepository } from '@/data/protocols'

import { hash } from 'bcrypt'
import faker from 'faker'

const user1 = new User({
  id: '1',
  name: 'Rennan',
  lastname: 'Cockles',
  email: 'rennan@teste.com',
  password: '123456'
})
const user2 = new User({
  id: '2',
  name: 'João',
  lastname: 'Ninguém',
  email: 'joao@teste.com',
  password: '123'
})
const usersMock = [user1, user2]

export class FakeUserRepository implements IGetUserByEmailRepository, ICreateUserRepository, ICheckUserByEmailRepository, IGetUserByIdRepository {
  async getByEmail (email: string): Promise<IGetUserByEmailRepository.Result> {
    let user = usersMock.find(user => user.email === email)
    if (user) {
      const hashedPassword = await hash(user.password, 12)
      user = new User({ ...user, password: hashedPassword })
    }
    return user
  }

  async getById (id: string): Promise<IGetUserByIdRepository.Result> {
    let user = usersMock.find(user => user.id === id)
    if (user) {
      const hashedPassword = await hash(user.password, 12)
      user = new User({ ...user, password: hashedPassword })
    }
    return user
  }

  async create (userData: ICreateUserRepository.Params): Promise<ICreateUserRepository.Result> {
    const id = faker.random.uuid()
    usersMock.push(new User({ ...userData, id }))
    return true
  }

  async checkByEmail (email: string): Promise<ICheckUserByEmailRepository.Result> {
    const user = await this.getByEmail(email)

    return Boolean(user)
  }
}
