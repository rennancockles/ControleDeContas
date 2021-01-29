import { GetUserByToken } from '@/data/usecases'
import { IGetUserByToken } from '@/domain/usecases'
import { FakeUserRepository } from '@/infra/db'
import { JwtAdapter } from '@/infra/encryption'
import env from '@/main/config/env'

export const makeGetUserByTokenUsecase = (): IGetUserByToken => {
  const decrypter = new JwtAdapter(env.jwtSecret, env.jwtExpirationTime)
  const fakeUserRepository = new FakeUserRepository()

  return new GetUserByToken(decrypter, fakeUserRepository)
}
