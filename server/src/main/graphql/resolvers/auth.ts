import { adaptResolver } from '@/main/adapters'
import { makeLoginController, makeRecoverPasswordController, makeSignUpController } from '@/main/factories'

export default {
  Query: {
    login: async (parent: any, args: any) => adaptResolver(makeLoginController(), args),
    recover: async (parent: any, args: any) => adaptResolver(makeRecoverPasswordController(), args)
  },

  Mutation: {
    signUp: async (parent: any, args: any) => adaptResolver(makeSignUpController(), args)
  }
}
