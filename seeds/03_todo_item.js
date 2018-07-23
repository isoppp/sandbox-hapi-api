exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('todo_item').del()
};
