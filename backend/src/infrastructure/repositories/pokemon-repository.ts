import { connection } from '../database/connection'
import { logger } from '../../utils/logging'
import crypto from 'crypto'

const TABLE_NAME = 'pokemon'

interface IPokemon {
  id: string
  name: string
  number: number
  type_id: string
}

const findAll = async () => {
  const items = await connection(TABLE_NAME).select('*')
  logger.info({ items }, 'Fetched items from database')

  return items
}

const create = async (pokemon: Omit<IPokemon, 'id'>) => {
  const id = crypto.randomBytes(3).toString('hex')
  const item = await connection(TABLE_NAME).insert({ id, ...pokemon })
  logger.info({ pokemon }, 'Create Pokemon')

  return item
}

const updateById = async (pokemon: IPokemon) => {
  const item = await connection(TABLE_NAME)
    .where('id', pokemon.id)
    .update(pokemon)
  logger.info({ pokemon }, 'Update pokemon infos')

  return item
}

export { findAll, create, updateById }
