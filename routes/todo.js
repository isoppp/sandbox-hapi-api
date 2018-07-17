const Knex = require('../db')

module.exports = [
  {
    method: 'GET',
    path: '/todo',
    handler: async (request, h) => {
      const userId = 1
      const todos = await Knex('todo').where('user_id', userId)
      return todos
    },
  },
  {
    method: 'GET',
    path: '/todo/{id}',
    handler: async (request, h) => {
      const id = request.params.id
      const userId = 1
      const [todo] = await Knex('todo').where({
        id: id,
        user_id: userId,
      })
      if (todo) return todo
      return h.response({ message: 'Not Found' }).code(404)
    },
  },
  {
    method: 'POST',
    path: '/todo',
    handler: async (request, h) => {
      const todo = request.payload
      todo.user_id = 1
      const [todoId] = await Knex('todo').returning('id').insert(todo)
      return { message: 'created', todo_id: todoId }
    }
  },
  {
    method: 'POST',
    path: '/todo/{id}/item',
    handler: async (request, h) => {
      const todoItem = request.payload
      todoItem.todo_id = request.params.id
      const [id] = await Knex('todo_item').insert(todoItem)
      return { message: 'created', id: id }
    }
  },
  {
    method: 'GET',
    path: '/todo/{id}/item',
    handler: async (request, h) => {
      const todoId = request.params.id
      const items = await Knex('todo_item').where('todo_id', todoId)
      return items
    },
  },
  {
    method: 'PUT',
    path: '/todo/{id}',
    handler: (request, h) => {
      const index = request.params.id - 1;
      todoList[index] = request.payload
      return { message: 'updated' }
    }
  },
  {
    method: 'PATCH',
    path: '/todo/{id}',
    handler: async (request, h) => {
      const todoId = request.params.id
      const title = request.payload.title
      const patched = await Knex('todo').update({ title }).where('id', todoId)
      return { message: 'patched' }
    }
  },
  {
    method: 'PATCH',
    path: '/todo/{todo_id}/item/{id}',
    handler: async (request, h) => {
      const itemId = request.params.id
      const item = request.payload
      const pathced = await Knex('todo_item').update(item).where('id', itemId)
      return { message: 'patched' }
    }
  },
  {
    method: 'DELETE',
    path: '/todo/{id}',
    handler: async (request, h) => {
      const id = request.params.id
      const deleted = await Knex('todo').where('id', id).delete()
      return { message: 'deleted' }
    }
  },
  {
    method: 'DELETE',
    path: '/todo/{todoId}/item/{id}',
    handler: async (request, h) => {
      const id = request.params.id
      const deleted = await Knex('todo_item').where('id', id).delete()
      return { message: 'deleted' }
    }
  }
]