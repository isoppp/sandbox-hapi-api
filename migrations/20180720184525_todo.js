exports.up = function (knex, Promise) {
  return knex.schema.createTable('todo', (table) => {
    table.increments('id')
    table.dateTime('created_at').notNull().defaultTo(knex.fn.now())
    table.dateTime('updated_at').nullable()
    table.dateTime('deleted_at').nullable()

    table.string('title', 50).notNull()
    table.integer('user_id').unsigned().references('id').inTable('user')
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('todo')
};
