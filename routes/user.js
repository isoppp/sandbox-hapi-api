const User = require('../model/User')
const md5 = require('md5')

module.exports = [
  {
    method: 'GET',
    path: '/user',
    handler: async (request, h) => {

      try {
        const user = await User.query()
        return user.map((elem) => {
          delete elem.password
          return elem
        })
      } catch (err) {
        return h.response({ ...err }).code(err.statusCode || 500)
      }
    }
  },
  {
    method: 'POST',
    path: '/user',
    handler: async (request, h) => {
      const data = request.payload
      data.password = md5(data.password)

      try {
        const user = await User.query().insert(data)
        return { message: 'created' }
      } catch (err) {
        return h.response({ ...err }).code(err.statusCode || 500)
      }
    }
  },
  {
    method: 'GET',
    path: '/user/{id}',
    handler: async (request, h) => {


      try {
        const user = await User.query().where({ id: request.params.id })
        console.log(user);
        if (!user[0]) return h.response({ statusCode: 404 }).code(404)
        delete user.password
        return user
      } catch (err) {
        return h.response({ ...err }).code(err.statusCode || 500)
      }
    }
  },
  {
    method: 'PUT',
    path: '/user/{id}',
    handler: async (request, h) => {
      try {
        const user = await User.query().patchAndFetchById(request.params.id, request.payload)
        if (!user) return h.response({ statusCode: 404 }).code(404)
        return { message: 'updated' }
      } catch (err) {
        return h.response({ ...err }).code(err.statusCode || 500)
      }
    }
  },
  {
    method: 'DELETE',
    path: '/user/{id}',
    handler: async (request, h) => {
      try {
        const user = await User.query().deleteById(request.params.id)
        console.log(user);
        if (!user) return h.response({ statusCode: 404 }).code(404)
        return { message: 'deleted' }
      } catch (err) {
        return h.response({ ...err }).code(err.statusCode || 500)
      }
    }
  },
]
