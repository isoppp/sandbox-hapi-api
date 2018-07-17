const env = process.env.NODE_ENV || 'development'

const configs = {
  development: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: 'password',
      database: 'todo',
      charset: 'utf8',
    },
  },
}

const Knex = require('knex')(configs[env])

module.exports = Knex
