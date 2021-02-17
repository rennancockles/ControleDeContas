import {
  authSchema,
  errorSchema,
  loginParamsSchema,
  signUpParamsSchema
} from './schemas/'

export default {
  auth: authSchema,
  error: errorSchema,
  loginParams: loginParamsSchema,
  signUpParams: signUpParamsSchema
}
