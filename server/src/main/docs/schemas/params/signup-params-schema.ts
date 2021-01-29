export const signUpParamsSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    lastname: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    password: {
      type: 'string'
    },
    passwordConfirmation: {
      type: 'string'
    }
  },
  required: ['name', 'lastname', 'email', 'password', 'passwordConfirmation']
}
