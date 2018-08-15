exports.up = async (knex) => {
  await knex.schema.createTable('user', (t) => {
    t.increments()
    t.timestamps(false, true)
    t.string('name', 50).notNull()
    t.string('email', 100).notNull()
    t.string('password', 200).notNull()
  })
}

exports.down = async(knex) {
  await knex.schema.dropTable('user')
}
