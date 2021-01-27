import { ILogin } from '@/domain/usecases'

import faker from 'faker'

export class LoginSpy implements ILogin {
  params: ILogin.Params
  result = {
    accessToken: faker.random.uuid(),
    name: faker.name.findName()
  }

  async execute (params: ILogin.Params): Promise<ILogin.Result> {
    this.params = params
    return this.result
  }
}