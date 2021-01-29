import { AuthMiddleware } from '@/presentation/middlewares'
import { IMiddleware } from '@/presentation/protocols'
import { makeGetUserByTokenUsecase } from '@/main/factories'

export const makeAuthMiddleware = (role?: string): IMiddleware => {
  const getUserByTokenUsecase = makeGetUserByTokenUsecase()
  return new AuthMiddleware(getUserByTokenUsecase, role)
}
