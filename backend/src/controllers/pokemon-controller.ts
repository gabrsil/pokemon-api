import { Request, Response } from 'express'
import { logger } from '../utils/logging'
import * as PokemonsRepository from '../infrastructure/repositories/pokemon-repository'
import * as TypesRepository from '../infrastructure/repositories/type-repository'
import bcrypt from 'bcrypt'
import { promisify } from 'util'
import { connection } from '../infrastructure/database/connection'

interface createRequest {
  name: string
  number: number
  type_id: string
}
const getAllPokemons = async (request: Request, response: Response) => {
  let pokemons
  try {
    pokemons = await PokemonsRepository.findAll()
    if (!pokemons.length) {
      return response.boom.notFound('No pokemons were found')
    }
  } catch (error) {
    request.log.error('error', error)
    return response.boom.internal(
      'An error ocurred while talking to the database'
    )
  }

  const payload = { items: pokemons }
  return response.json(payload)
}

const createNewPokemon = async (request: Request, response: Response) => {
  const { name, number, type_id }: createRequest = request.body
  let createdPokemon
  try {
    const type = await TypesRepository.findById(type_id)
    if (!type) return response.boom.notFound('Type not found')

    createdPokemon = await PokemonsRepository.create({
      name,
      number,
      type_id
    })
  } catch (error) {
    request.log.error('error', error)
    return response.boom.internal(
      'An error ocurred while talking to the database'
    )
  }

  const payload = {
    item: {
      createdPokemon,
      name,
      number,
      type_id
    }
  }

  return response.json(payload)
}

export { getAllPokemons, createNewPokemon }
