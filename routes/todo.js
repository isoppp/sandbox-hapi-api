const todoList = [
  {
    title: 'Shopping',
    dateCreated: 'Jan 21, 2018',
    list: [
      { text: 'Node.js Books', done: false },
      { text: 'MacBook', done: false },
      { text: 'Shoes', done: true },
    ],
  },
  {
    title: 'Places to visit',
    dateCreated: 'Feb 12, 2018',
    list: [
      { text: 'Nairobi, Kenya', done: false },
      { text: 'Moscow, Russia', done: false },
    ],
  },
]

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
    handler: (request, h) => {
      const todo = request.payload
      todoList.push(todo)
      return { message: 'created' }
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