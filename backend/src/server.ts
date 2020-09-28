import express from 'express'
import pino from 'pino-http'
import { logger } from './utils/logging'
import { Routes } from './routes/index'
import boom from 'express-boom'
import { errorHandler, notFound } from './middleware/errorHandler'
import jwt from 'express-jwt'
import cookieParser from 'cookie-parser'
import { tokenHandle } from './middleware/cookieHandler'

const { JWT_SECRET = 'bolodecenoura' } = process.env

export const init = async () => {
  const app = express()
  app.use(express.json())
  app.use(pino({ logger }))
  app.use(boom())
  app.use(cookieParser())
  for (const route of Routes) {
    app.use(route.path, route.middleware, route.handler)
  }
  app.use(jwt({ secret: JWT_SECRET, algorithms: ['HS256'] }))
  app.use(errorHandler)
  app.use(notFound)
  app.get('/', (req, res) => {
    req.log.info('lal')
    res.json({ message: 'First Route' })
  })

  return app
}
