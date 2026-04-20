import { Router } from 'express'
import { container } from 'tsyringe'
import ListOperadoresController from '@modules/operadores/infra/http/controllers/list_operadores_controller'

const operadoresRouter = Router()

const listOperadoresController = container.resolve(ListOperadoresController)

operadoresRouter.get('/', (_req, res) => listOperadoresController.index(_req, res))

export default operadoresRouter
