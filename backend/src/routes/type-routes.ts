import * as express from 'express'
import { logger } from '../utils/logging'
import * as TypeController from '../controllers/type-controller'

const TypeRoute: express.Router = express.Router()

TypeRoute.get('/', TypeController.getAllTypes)

TypeRoute.post('/new', TypeController.createNewType)

export default TypeRoute
