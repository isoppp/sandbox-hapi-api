const Hapi = require('hapi')
const good = require('good');
const hapiAuthJwt = require('hapi-auth-jwt2');
const Knex = require('./db');

// create a server with host and port
const createServer = async () => {

  const addRoutes = (server) => {
    server.route({
      method: 'GET',
      path: '/',
      handler: (request, h) => {
        return { message: 'Hello world!' }
      },
      config: {
        auth: false,
      }
    })

    server.route(require('./routes/todo'))
    server.route(require('./routes/auth'))
    server.route(require('./routes/user'))
  }

  const registerPlugin = async (server) => {
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
    // server.auth.default('token')

    const goodOptions = {
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

    await server.register({
      plugin: good,
      options: goodOptions,
    })
  }

  const server = new Hapi.Server({
    port: process.env.PORT || 5000,
    host: 'localhost',
    routes: {
      cors: true,
    }
  })

  addRoutes(server)
  await registerPlugin(server)

  return server
}

module.exports = createServer
