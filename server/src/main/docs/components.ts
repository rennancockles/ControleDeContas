import { apiKeyAuthSchema } from './schemas/'
import {
  badRequest,
  serverError,
  unauthorized,
  notFound,
  forbidden,
  noContent
} from './components/'

export default {
  securitySchemes: {
    apiKeyAuth: apiKeyAuthSchema
  },
  badRequest,
  serverError,
  unauthorized,
  notFound,
  forbidden,
  noContent
}
