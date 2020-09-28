import { Request, Response } from 'express'
import { logger } from '../utils/logging'
import * as TypesRepository from '../infrastructure/repositories/type-repository'
import { type } from 'os'

interface NewType {
  name: string
}

const getAllTypes = async (request: Request, response: Response) => {
  let types
  try {
    types = await TypesRepository.findAll()
    if (!types.length) {
      return response.boom.notFound('No types were found')
    }
  } catch (error) {
    request.log.error('error', error)
    return response.boom.internal(
      'An error ocurred while talking to the database'
    )
  }

  const payload = { items: types }

  return response.json(payload)
}

const createNewType = async (request: Request, response: Response) => {
  const { name }: NewType = request.body
  let createdType
  try {
    createdType = await TypesRepository.create({ name })
  } catch (error) {
    request.log.error('error', error)
    return response.boom.internal(
      'An error ocurred while talking to the database'
    )
  }

  const payload = {
    item: {
      createdType,
      name
    }
  }

  return response.json(payload)
}

export { getAllTypes, createNewType }
