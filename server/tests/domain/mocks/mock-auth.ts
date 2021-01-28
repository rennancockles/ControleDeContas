import { ICreateUser, IAuthentication } from '@/domain/usecases'

import faker from 'faker'

export const mockCreateUserParams = (): ICreateUser.Params => ({
  name: faker.name.firstName(),
  lastname: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAuthenticationParams = (): IAuthentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})
