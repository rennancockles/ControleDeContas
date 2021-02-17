import { ICreateUser, IAuthentication, IGetUserByToken, ISendRecoverEmail } from '@/domain/usecases'

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

export class GetUserByTokenSpy implements IGetUserByToken {
  accessToken: IGetUserByToken.Params
  result = {
    id: faker.random.uuid(),
    name: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.random.word()
  }

  async execute (accessToken: IGetUserByToken.Params): Promise<IGetUserByToken.Result> {
    this.accessToken = accessToken
    return this.result
  }
}

export class SendRecoverEmailSpy implements ISendRecoverEmail {
  email: ISendRecoverEmail.Params

  async execute (email: ISendRecoverEmail.Params): Promise<ISendRecoverEmail.Result> {
    this.email = email
  }
}
