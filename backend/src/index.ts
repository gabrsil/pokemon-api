import { init } from './server'
import { logger } from './utils/logging'

const { PORT = 3000 } = process.env

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

const startServer = async () => {
  const server = await init()

  try {
    server.listen(PORT, () => {
      logger.info(`Server running on Port ${PORT}`)
    })
  } catch (err) {
    logger.error('Error Starting')
  }
}

startServer()
