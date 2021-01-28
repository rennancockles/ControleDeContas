import { ICreateUser, IAuthentication } from '@/domain/usecases'

import faker from 'faker'

export class AuthenticationSpy implements IAuthentication {
  params: IAuthentication.Params
  result = {
    accessToken: faker.random.uuid(),
    name: faker.name.findName()
  }

  async execute (params: IAuthentication.Params): Promise<IAuthentication.Result> {
    this.params = params
    return this.result
  }
}

export class CreateUserSpy implements ICreateUser {
  params: ICreateUser.Params
  result = true

  async execute (params: ICreateUser.Params): Promise<ICreateUser.Result> {
    this.params = params
    return this.result
  }
}
