import { SendRecoverEmail } from '@/data/usecases'
import { ISendRecoverEmail } from '@/domain/usecases'
import { FakeUserRepository } from '@/infra/db'
import { CryptoAdapter } from '@/infra/encryption'
import env from '@/main/config/env'
import { makeMailSender } from '../email'

export const makeSendRecoverEmailUsecase = (): ISendRecoverEmail => {
  const cryptoAdapter = new CryptoAdapter(env.cryptoAlg, env.cryptoKey, env.cryptoIV)
  const mailSender = makeMailSender()
  const fakeUserRepository = new FakeUserRepository()

  return new SendRecoverEmail(mailSender, fakeUserRepository, cryptoAdapter)
}
