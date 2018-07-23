const md5 = require('md5')

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        {
          name: 'Test User',
          email: 'user@example.com',
          password: md5('u53rtest'),
        },
      ]);
    });
};
