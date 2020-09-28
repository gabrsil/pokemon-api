import { logger } from '../../utils/logging'
import { connection } from '../database/connection'

const TABLE_NAME = 'type'

interface IType {
  id: string
  name: string
}

const findAll = async () => {
  const items = await connection(TABLE_NAME).select('*')
  logger.info({ items }, 'Fetched items from database')

  return items
}

const findById = async (id: string) => {
  const item = await connection(TABLE_NAME).select('*').where('id', id)
  logger.info({ item }, 'Fetched item from database')

  return item
}

const create = async (type: Omit<IType, 'id'>) => {
  const item = await connection(TABLE_NAME).insert(type)
  logger.info({ type }, 'Create Type')

  return item
}

export { findAll, create, findById }
