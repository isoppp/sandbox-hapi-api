const createServer = require('./server')
const startServer = async () => {
  const server = await createServer()

  try {
    await server.start()
    console.log((`server started at port:  ${server.info.uri} with env: ${process.env.NODE_ENV})}`))
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

startServer()