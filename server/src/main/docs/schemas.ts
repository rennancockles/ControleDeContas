import {
  authSchema,
  errorSchema,
  loginParamsSchema,
  signUpParamsSchema,
  recoverParamsSchema
} from './schemas/'

export default {
  auth: authSchema,
  error: errorSchema,
  loginParams: loginParamsSchema,
  signUpParams: signUpParamsSchema,
  recoverParams: recoverParamsSchema
}
