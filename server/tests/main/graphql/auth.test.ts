import { makeApolloServer } from '@/tests/main/graphql/helpers'
import { mockCreateUserParams } from '@/tests/domain/mocks'

import { ApolloServer, gql } from 'apollo-server-express'
import { createTestClient } from 'apollo-server-integration-testing'

let apolloServer: ApolloServer

describe('Auth GraphQL', () => {
  beforeAll(async () => {
    apolloServer = makeApolloServer()
  })

  describe('Login Query', () => {
    const loginQuery = gql`
      query login ($email: String!, $password: String!) {
        login (email: $email, password: $password) {
          accessToken
          name
        }
      }
    `

    it('Should return an Account on valid credentials', async () => {
      const { query } = createTestClient({ apolloServer })

      const res: any = await query(loginQuery, {
        variables: {
          email: 'rennan@teste.com',
          password: '123456'
        }
      })

      expect(res.data.login.accessToken).toBeTruthy()
      expect(res.data.login.name).toBe('Rennan')
    })

    it('Should return UnauthorizedError on invalid credentials', async () => {
      const { query } = createTestClient({ apolloServer })

      const res: any = await query(loginQuery, {
        variables: {
          email: 'rennan@teste.com',
          password: '123'
        }
      })

      expect(res.data).toBeFalsy()
      expect(res.errors[0].message).toBe('Unauthorized')
    })
  })

  describe('SignUp Mutation', () => {
    const signUpMutation = gql`
      mutation signUp ($name: String!, $lastname: String!, $email: String!, $password: String!, $passwordConfirmation: String!) {
        signUp (name: $name, lastname: $lastname, email: $email, password: $password, passwordConfirmation: $passwordConfirmation) {
          accessToken
          name
        }
      }
    `

    it('Should return an Account on valid data', async () => {
      const { mutate } = createTestClient({ apolloServer })
      const createUserParams = mockCreateUserParams()

      const res: any = await mutate(signUpMutation, {
        variables: {
          ...createUserParams,
          passwordConfirmation: createUserParams.password
        }
      })

      expect(res.data.signUp.accessToken).toBeTruthy()
      expect(res.data.signUp.name).toBe(createUserParams.name)
    })

    it('Should return EmailInUseError on invalid data', async () => {
      const { mutate } = createTestClient({ apolloServer })
      const createUserParams = mockCreateUserParams()

      const res: any = await mutate(signUpMutation, {
        variables: {
          ...createUserParams,
          email: 'rennan@teste.com',
          passwordConfirmation: createUserParams.password
        }
      })

      expect(res.data).toBeFalsy()
      expect(res.errors[0].message).toBe('The received email is already in use')
    })

    it('Should return UserInputError on invalid data', async () => {
      const { mutate } = createTestClient({ apolloServer })
      const createUserParams = mockCreateUserParams()

      const res: any = await mutate(signUpMutation, {
        variables: {
          ...createUserParams,
          email: 'random@fake@email.com',
          passwordConfirmation: createUserParams.password
        }
      })

      expect(res.data).toBeFalsy()
      expect(res.errors[0].message).toBe('Invalid param: email')
    })
  })
})
