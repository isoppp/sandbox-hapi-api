const Hapi = require('hapi')
const server = new Hapi.Server({
  port: 5000,
  host: 'localhost',
})

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

server.route({
  method: 'GET',
  path: '/',
  handler: (request, h) => {
    return { message: 'Hello world!' }
  }
})



process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

const init = async () => {
  await server.register({
    plugin: require('good'),
    options,
  })

  await server.start()
  console.log(`Server running at: ${server.info.uri}`)
}

init()
