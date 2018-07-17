const Knex = require('../db')

module.exports = [
  {
    method: 'GET',
    path: '/todo',
    handler: (request, h) => todoList
  },
  {
    method: 'GET',
    path: '/todo/{id}',
    handler: (request, h) => {
      const id = request.params.id - 1
      if (todoList[id]) return todoList[id]
      return h.response({ message: 'Not Found' }).code(404)
    }
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
    handler: (request, h) => {
      const index = request.params.id - 1
      const todo = todoList[index]
      Object.keys(request.payload).forEach(key => {
        if (key in todo) {
          todo[key] = request.payload[key]
        }
      })
      return { message: 'patched' }
    }
  },
  {
    method: 'DELETE',
    path: '/todo/{id}',
    handler: (request, h) => {
      const index = request.params.id - 1
      delete todoList[index]
      return { message: 'deleted' }
    }
  }
]