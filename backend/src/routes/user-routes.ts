import * as express from 'express'
import { logger } from '../utils/logging'
import * as AuthController from '../controllers/authentication-controller'

const UserRoute: express.Router = express.Router()

UserRoute.get('/', (req, res) => {
  logger.info('Start Route')
  return res.send('First Route')
})

UserRoute.post('/register', AuthController.registerNewUser)
UserRoute.post('/login', AuthController.loginUser)

export default UserRoute
