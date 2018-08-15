const md5 = require('md5')

exports.seed = async (knex) => {
  await knex('user').del()
  await knex('user').insert([
    {
      name: 'Test User',
      email: 'user@example.com',
      password: md5('u53rtest'),
    },
  ])
}
