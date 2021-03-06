const Model = require('objection').Model
const knex = require('./db')
Model.knex(knex)

const createServer = require('./server')
const startServer = async () => {
  const server = await createServer()

  try {
    await server.start()
    console.log((`server started at port:  ${server.info.uri} with env: ${process.env.NODE_ENV || 'development'})}`))
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

startServer()
