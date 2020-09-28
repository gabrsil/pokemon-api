import { Request, Response } from 'express'
import { logger } from '../utils/logging'
import UsersRepository from '../infrastructure/repositories/user-respository'
import bcrypt from 'bcrypt'
import { promisify } from 'util'
import jsonwebtoken from 'jsonwebtoken'

const comparePromise = promisify(bcrypt.compare)
const { JWT_SECRET = 'bolodecenoura' } = process.env

interface RegistrationRequest {
  name: string
  email: string
  password: string
}
interface LoginRequest {
  email: string
  password: string
}

const registerNewUser = async (request: Request, response: Response) => {
  const { name, email, password }: RegistrationRequest = request.body
  let createdUser
  try {
    const user = await UsersRepository.findByEmail(email)
    if (user) return response.boom.conflict('Email already exists')

    createdUser = await UsersRepository.create({
      name,
      email,
      password
    })
  } catch (error) {
    request.log.error(error, 'error')
    return response.boom.internal(
      'An error ocurred while talking to the database'
    )
  }

  const payload = {
    item: {
      createdUser,
      name,
      email
    }
  }

  return response.json(payload)
}

const loginUser = async (request: Request, response: Response) => {
  const { email, password }: LoginRequest = request.body

  try {
    const user = await UsersRepository.findByEmail(email)
    if (!user) return response.boom.notFound('User Not Found')

    const result = await comparePromise(password, user.password).catch(
      (err) => {
        logger.error(err, 'Error Comparing Password')
        return err
      }
    )
    if (result) {
      const token = jsonwebtoken.sign(
        { id: user.id, email: user.email },
        JWT_SECRET
      )
      response.cookie('token', token, { httpOnly: true })
      const payload = { message: 'success', success: result }

      return response.json(payload)
    }

    return response.boom.unauthorized('Incorrect password or email')
  } catch (err) {
    request.log.error(err, 'error')
    return response.boom.internal(
      'An error ocurred while talking to the database'
    )
  }
}

export { registerNewUser, loginUser }
