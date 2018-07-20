exports.up = function (knex, Promise) {
  return knex.schema.createTable('user', (table) => {
    table.increments('id')
    table.dateTime('created_at').notNull().defaultTo(knex.fn.now())
    table.dateTime('updated_at').nullable()
    table.dateTime('deleted_at').nullable()

    table.string('name', 50).notNull()
    table.string('email', 100).notNull()
    table.string('password', 200).notNull()
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('user')
};
