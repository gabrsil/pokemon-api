import * as express from 'express'
import { logger } from '../utils/logging'
import * as PokemonController from '../controllers/pokemon-controller'

const PokemonRoute: express.Router = express.Router()

PokemonRoute.get('/', PokemonController.getAllPokemons)

PokemonRoute.post('/new', PokemonController.createNewPokemon)

export default PokemonRoute
