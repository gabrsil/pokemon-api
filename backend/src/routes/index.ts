import * as express from 'express'
import UserRoutes from './user-routes'
import PokemonRoutes from './pokemon-routes'
import TypeRoutes from './type-routes'
import { tokenHandle, publicHandle } from '../middleware/cookieHandler'

interface Route {
  path: string
  handler: express.Router
  middleware?: any | undefined
}

export const Routes: Route[] = [
  {
    handler: UserRoutes,
    path: '/users',
    middleware: publicHandle
  },
  {
    handler: PokemonRoutes,
    path: '/pokemons',
    middleware: tokenHandle
  },
  {
    handler: TypeRoutes,
    path: '/types',
    middleware: publicHandle
  }
]
