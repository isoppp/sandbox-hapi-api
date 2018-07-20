exports.up = function (knex, Promise) {
  return knex.schema.createTable('todo_item', (table) => {
    table.increments('id')
    table.dateTime('created_at').notNull().defaultTo(knex.fn.now())
    table.dateTime('updated_at').nullable()
    table.dateTime('deleted_at').nullable()

    table.string('text', 50).notNull()
    table.boolean('done').defaultTo(false)
    table.integer('todo_id').unsigned().references('id').inTable('todo')
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('todo_item')
};
