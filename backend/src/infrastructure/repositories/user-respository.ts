import { connection } from '../database/connection'
import { logger } from '../../utils/logging'
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import { promisify } from 'util'

const TABLE_NAME = 'user'
const NUM_ROUNDS = 8
const hashPromise = promisify(bcrypt.hash)

interface IUser {
  id: string
  name: string
  email: string
  password: string
}

const findByEmail = async (email: string) => {
  const item = await connection(TABLE_NAME)
    .select('*')
    .where('email', email)
    .first()
  logger.info({ item }, 'Fetched item from database')

  return item
}

const findById = async (id: string) => {
  const item = await connection(TABLE_NAME).select('*').where('id', id).first()
  logger.info({ item }, 'Fetched item from database')

  return item
}

const create = async (user: Omit<IUser, 'id'>) => {
  const id = crypto.randomBytes(4).toString('hex')
  const item = hashPromise(user.password, NUM_ROUNDS)
    .then(async (res) => {
      user.password = res
      const resp = await connection(TABLE_NAME).insert({ id, ...user })
      return resp
    })
    .catch((err) => {
      logger.error(err, 'Error')
      return err
    })
  return item
}

export default { findByEmail, create, findById }
