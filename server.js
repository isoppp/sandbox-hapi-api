const Hapi = require('hapi')
const good = require('good');
const hapiAuthJwt = require('hapi-auth-jwt2');
const Knex = require('./db');

// create a server with host and port
const server = new Hapi.Server({
  port: 5000,
  host: 'localhost',
  routes: {
    cors: true,
  }
})

// routes
const routes = {}
routes.todo = require('./routes/todo')
routes.auth = require('./routes/auth')

const options = {
  ops: {
    interval: 100000,
  },
  reporters: {
    consoleReporters: [
      { module: 'good-console' },
      'stdout'
    ],
  },
}

// Add the route
server.route({
  method: 'GET',
  path: '/',
  handler: (request, h) => {
    return { message: 'Hello world!' }
  }
})

server.route(routes.todo)
server.route(routes.auth)

const init = async () => {
  await server.register(hapiAuthJwt)
  server.auth.strategy('token', 'jwt', {
    key: 'secretkey-hash',
    verifyOptions: {
      algorithms: ['HS256'],
    },
    validate: async (decoded, request, h) => {
      console.log(" - - - - - - - decoded token:");
      console.log(decoded);
      console.log(" - - - - - - - request info:");
      console.log(request.info);
      console.log(" - - - - - - - user agent:");
      console.log(request.headers['user-agent']);
      const [user] = await Knex('user').where({ id: decoded.id });
      return { isValid: user && user.email === decoded.email && user.name === decoded.name }
    },
  })

  server.auth.default('token')

  await server.register({
    plugin: good,
    options,
  })

  await server.start()
  return server
}

init().then(server => {
  console.log(`Server running at: ${server.info.uri}`)
}).catch(err => {
  console.log(err)
})
