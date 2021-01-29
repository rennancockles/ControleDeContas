import { ICheckUserByEmailRepository, ICreateUserRepository, IGetUserByEmailRepository, IGetUserByIdRepository } from '@/data/protocols'

import faker from 'faker'

const usersMock = [
  {
    id: '1',
    name: 'Rennan',
    lastname: 'Cockles',
    email: 'rennan@teste.com',
    password: '$2b$12$qa3KYIwdjUVNhM107628.eh1BEG9r6QSrlMhloFXbMQHAaq2nWjZi'
  },
  {
    id: '2',
    name: 'João',
    lastname: 'Ninguém',
    email: 'joao@teste.com',
    password: '$2b$12$fH/J.yzPrO2YD6/OWg0i2ewG/AoHZFIdRRv4M15VvwrkV4fy/VgSS'
  }
]

export class FakeUserRepository implements IGetUserByEmailRepository, ICreateUserRepository, ICheckUserByEmailRepository, IGetUserByIdRepository {
  async getByEmail (email: string): Promise<IGetUserByEmailRepository.Result> {
    return usersMock.find(user => user.email === email)
  }

  async getById (id: string): Promise<IGetUserByIdRepository.Result> {
    return usersMock.find(user => user.id === id)
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
