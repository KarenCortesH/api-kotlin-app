const app = require('../../app')
const supertest = require('supertest')
const request = supertest(app)

describe('billing-profiles tests', () => {
  describe('POST /billing-profiles', () => {
    it('respond 400 status', async done => {
      const response = await request.post('/api/users')
        .send({})

      expect(response.status).toBe(400)
      done()
    })
  })
})
