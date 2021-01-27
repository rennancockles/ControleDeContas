import { IGetUserByEmailRepository } from '@/data/protocols'

import { hash } from 'bcrypt'

const usersMock = [
  {
    id: '1',
    name: 'Rennan',
    email: 'rennan@teste.com',
    password: '123456'
  },
  {
    id: '2',
    name: 'João',
    email: 'joao@teste.com',
    password: '123'
  }
]

export class FakeUserRepository implements IGetUserByEmailRepository {
  email: string

  async getByEmail (email: string): Promise<IGetUserByEmailRepository.Result> {
    this.email = email
    const user = usersMock.find(user => user.email === email)
    if (user) {
      user.password = await hash(user.password, 12)
    }
    return user
  }
}
