import app from '@/main/config/app'
import { mockCreateUserParams, mockAuthenticationParams } from '@/tests/domain/mocks'

import request from 'supertest'

describe('Auth Routes', () => {
  describe('POST /signup', () => {
    it('Should return 200 on signup success', async () => {
      const createUserParams = mockCreateUserParams()

      await request(app)
        .post('/api/signup')
        .send({
          ...createUserParams,
          passwordConfirmation: createUserParams.password
        })
        .expect(200)
    })

    it('Should return 400 on signup fail with missing parameters', async () => {
      const createUserParams = mockCreateUserParams()

      await request(app)
        .post('/api/signup')
        .send(createUserParams)
        .expect(400)
    })

    it('Should return 400 when password and passwordConfirmation do not match', async () => {
      const createUserParams = mockCreateUserParams()

      await request(app)
        .post('/api/signup')
        .send({
          ...createUserParams,
          passwordConfirmation: 'any_password'
        })
        .expect(400)
    })

    it('Should return 400 when email is invalid', async () => {
      const createUserParams = mockCreateUserParams()

      await request(app)
        .post('/api/signup')
        .send({
          ...createUserParams,
          email: 'random@fake@email.com',
          passwordConfirmation: createUserParams.password
        })
        .expect(400)
    })

    it('Should return 403 when email already exists', async () => {
      const createUserParams = mockCreateUserParams()

      await request(app)
        .post('/api/signup')
        .send({
          ...createUserParams,
          email: 'rennan@teste.com',
          passwordConfirmation: createUserParams.password
        })
        .expect(403)
    })
  })

  describe('POST /login', () => {
    it('Should return 200 on login success', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'rennan@teste.com',
          password: '123456'
        })
        .expect(200)
    })

    it('Should return 401 on login fail with wrong password', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'rennan@teste.com',
          password: '123'
        })
        .expect(401)
    })

    it('Should return 401 on login fail with wrong email', async () => {
      const authenticationParams = mockAuthenticationParams()

      await request(app)
        .post('/api/login')
        .send(authenticationParams)
        .expect(401)
    })
  })

  describe('POST /recover', () => {
    it('Should return 204 on recover success', async () => {
      await request(app)
        .post('/api/recover')
        .send({
          email: 'rennan@teste.com'
        })
        .expect(204)
    })

    it('Should return 400 on missing email', async () => {
      await request(app)
        .post('/api/recover')
        .send({})
        .expect(400)
    })

    it('Should return 400 on empty email', async () => {
      await request(app)
        .post('/api/recover')
        .send({ email: '' })
        .expect(400)
    })

    it('Should return 400 on invalid email', async () => {
      await request(app)
        .post('/api/recover')
        .send({ email: 'invalid@email@test.com' })
        .expect(400)
    })
  })
})
