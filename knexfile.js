// Update with your config settings.

module.exports = {

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

  staging: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: 'password',
      database: 'todo',
      charset: 'utf8',
    },
    pool: {
      min: 2,
      max: 10
    },
  },

  production: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: 'password',
      database: 'todo',
      charset: 'utf8',
    },
    pool: {
      min: 2,
      max: 10
    },
  }

};
