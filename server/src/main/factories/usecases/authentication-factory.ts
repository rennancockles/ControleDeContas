import env from '@/main/config/env'
import { FakeUserRepository } from '@/infra/db'
import { BcryptAdapter, JwtAdapter } from '@/infra/encryption'
import { Authentication } from '@/data/usecases'
import { IAuthentication } from '@/domain/usecases'

export const makeAuthenticationUsecase = (): IAuthentication => {
  const salt = 12

  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret, '24h')
  const fakeUserRepository = new FakeUserRepository()

  return new Authentication(fakeUserRepository, bcryptAdapter, jwtAdapter)
}
