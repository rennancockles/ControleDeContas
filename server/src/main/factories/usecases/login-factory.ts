import env from '@/main/config/env'
import { FakeUserRepository } from '@/infra/db'
import { BcryptAdapter, JwtAdapter } from '@/infra/encryption'
import { Login } from '@/data/usecases'
import { ILogin } from '@/domain/usecases'

export const makeLoginUsecase = (): ILogin => {
  const salt = 12

  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret, '24h')
  const fakeUserRepository = new FakeUserRepository()

  return new Login(fakeUserRepository, bcryptAdapter, jwtAdapter)
}
