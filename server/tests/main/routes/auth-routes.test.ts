import app from '@/main/config/app'

import request from 'supertest'

describe('Auth Routes', () => {
  // describe('POST /signup', () => {
  //   test('Should return 200 on signup', async () => {
  //     await request(app)
  //       .post('/api/signup')
  //       .send({
  //         name: 'Rodrigo',
  //         email: 'rodrigo.manguinho@gmail.com',
  //         password: '123',
  //         passwordConfirmation: '123'
  //       })
  //       .expect(200)
  //     await request(app)
  //       .post('/api/signup')
  //       .send({
  //         name: 'Rodrigo',
  //         email: 'rodrigo.manguinho@gmail.com',
  //         password: '123',
  //         passwordConfirmation: '123'
  //       })
  //       .expect(403)
  //   })
  // })

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
      await request(app)
        .post('/api/login')
        .send({
          email: 'teste@teste.com',
          password: '123456'
        })
        .expect(401)
    })
  })
})
