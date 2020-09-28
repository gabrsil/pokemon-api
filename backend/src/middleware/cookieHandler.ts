import { Request, Response, NextFunction, request } from 'express'
import { req } from 'pino-std-serializers'
import { logger } from '../utils/logging'
import jwt from 'jsonwebtoken'
import { promisify } from 'util'

const { JWT_SECRET = 'bolodecenoura' } = process.env

const tokenHandle = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { token } = request.cookies
  logger.info({ token }, 'Token')

  if (!token) return response.boom.unauthorized('Token not provided')
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    logger.info({ decoded }, 'Decoded')
    next()
  } catch (error) {
    logger.error({ error }, 'Error')
    return response.boom.unauthorized('Invalid Token')
  }
}

const publicHandle = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  logger.info({ body: request.body }, 'body')
  next()
}

export { tokenHandle, publicHandle }
