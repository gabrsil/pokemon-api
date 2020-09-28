import express from 'express'
import pino from 'pino-http'
import { logger } from './utils/logging'
import boom from 'express-boom'

export const init = async () => {
  const app = express()
  app.use(pino({ logger }))
  app.use(boom())
  app.get('/', (req, res) => {
    req.log.info('lal')
    res.json({ message: 'First Route' })
  })

  return app
}
