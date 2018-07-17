const assert = require('assert')
const Lab = require('lab')
const lab = exports.lab = Lab.script()
const { experiment, test, before } = lab
const createServer = require('../server')

experiment('Base API', () => {
  let server = {}
  before(async () => {
    server = await createServer()
  })

  test('GET: /', () => {
    const options = {
      method: 'GET',
      url: '/',
    }
    server.inject(options, (response) => {
      assert.equal(response.statusCode, 200)
      assert.equal(response.result.message, 'Hello world!')
    })
  })
})

experiment('Authentication', () => {
  let server = {}
  before(async () => {
    server = await createServer()
  })

  test('GET: /todo without auth', () => {
    const options = {
      method: 'GET',
      url: '/todo'
    }
    server.inject(options, (response) => {
      assert.equal(response.statusCode, 401)
    })
  })
})

experiment('/todo/* routes', () => {
  let server = {}

  const headers = {
    Authorization: '',
  }

  before(async () => {
    server = await createServer()
    const options = {
      method: 'POST',
      url: '/auth',
      payload: {
        email: 'user@example.com',
        password: 'u53rtest',
      },
    }
    const response = await server.inject(options)
    headers.Authorization += response.result.token
  })

  test('GET: /todo', () => {
    console.log('headers', headers);
    const options = {
      method: 'GET',
      url: '/todo',
      headers: headers,
    }
    server.inject(options, (response) => {
      assert.equal(Array.isArray(response.result), true)
      assert.equal(response.statusCode, 200)
    })
  })
})
