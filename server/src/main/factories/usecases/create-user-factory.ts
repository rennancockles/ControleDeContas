// import env from '@/main/config/env'
import { CreateUser } from '@/data/usecases'
import { ICreateUser } from '@/domain/usecases'
import { FakeUserRepository } from '@/infra/db'
import { BcryptAdapter } from '@/infra/encryption'

export const makeCreateUserUsecase = (): ICreateUser => {
  const salt = 12

  const bcryptAdapter = new BcryptAdapter(salt)
  const fakeUserRepository = new FakeUserRepository()

  return new CreateUser(bcryptAdapter, fakeUserRepository, fakeUserRepository)
}
