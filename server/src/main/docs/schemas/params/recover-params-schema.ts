export const recoverParamsSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string'
    }
  },
  required: ['email']
}
