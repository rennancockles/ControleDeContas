import app from '@/main/config/app'

import request from 'supertest'

describe('Routes', () => {
  it('Should return 404 on route not found', async () => {
    await request(app)
      .post('/api/loginn')
      .expect(404)
  })

  it('Should return 404 on existent route with wrong method', async () => {
    await request(app)
      .get('/api/login')
      .expect(404)
  })
})
