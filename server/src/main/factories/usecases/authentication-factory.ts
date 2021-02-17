import env from '@/main/config/env'
import { FakeUserRepository } from '@/infra/db'
import { BcryptAdapter, JwtAdapter } from '@/infra/encryption'
import { Authentication } from '@/data/usecases'
import { IAuthentication } from '@/domain/usecases'

export const makeAuthenticationUsecase = (): IAuthentication => {
  const bcryptAdapter = new BcryptAdapter(env.bcryptSalt as number)
  const jwtAdapter = new JwtAdapter(env.jwtSecret, env.jwtExpirationTime)
  const fakeUserRepository = new FakeUserRepository()

  return new Authentication(fakeUserRepository, bcryptAdapter, jwtAdapter)
}
