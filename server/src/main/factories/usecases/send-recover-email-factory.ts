import { SendRecoverEmail } from '@/data/usecases'
import { ISendRecoverEmail } from '@/domain/usecases'
import { FakeUserRepository } from '@/infra/db'
import { makeMailSender } from '../email'

export const makeSendRecoverEmailUsecase = (): ISendRecoverEmail => {
  const mailSender = makeMailSender()
  const fakeUserRepository = new FakeUserRepository()

  return new SendRecoverEmail(mailSender, fakeUserRepository)
}
