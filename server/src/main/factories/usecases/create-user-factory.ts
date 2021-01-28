import env from '@/main/config/env'
import { CreateUser } from '@/data/usecases'
import { ICreateUser } from '@/domain/usecases'
import { FakeUserRepository } from '@/infra/db'
import { BcryptAdapter } from '@/infra/encryption'

export const makeCreateUserUsecase = (): ICreateUser => {
  const bcryptAdapter = new BcryptAdapter(env.bcryptSalt as number)
  const fakeUserRepository = new FakeUserRepository()

  return new CreateUser(bcryptAdapter, fakeUserRepository, fakeUserRepository)
}
