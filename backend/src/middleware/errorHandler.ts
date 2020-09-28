import * as express from 'express'

const { NODE_ENV = 'development' } = process.env

const notFound = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  res.status(404)
  next(res.boom.notFound())
}

const errorHandler = (
  error: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const statusCode = req.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode)
  res.json({
    message: error,
    stack: NODE_ENV === 'production' ? 'ops' : error.stack
  })
}

export { notFound, errorHandler }
