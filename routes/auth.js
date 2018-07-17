const jwt = require('jsonwebtoken')
const Joi = require('joi')
const md5 = require('md5')

const Knex = require('../db')

module.exports = {
  method: 'POST',
  path: '/auth',
  handler: async (request, h) => {
    const { email, password } = request.payload
    const [user] = await Knex('user').where({ email })

    if (!user) {
      return h.response({ message: 'user not found' }).code(404)
    }

    if (user.password === md5(password)) {
      const token = jwt.sign(
        {
          name: user.name,
          email: user.email,
          id: user.id,
        },
        'secretkey-hash', //should match that in server.js
        {
          algorithm: 'HS256',
          expiresIn: '120d',
        }
      )
      return { token, uid: user.uid }
    }
    return h.response({ message: 'incorrect password' }).code(400)
  },
  config: {
    auth: false,
    validate: {
      payload: {
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      },
    },
  },
}