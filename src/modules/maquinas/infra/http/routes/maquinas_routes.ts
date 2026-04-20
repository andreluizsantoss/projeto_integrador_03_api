import { Router } from 'express'
import { container } from 'tsyringe'
import { isAuthenticated } from '@shared/infra/http/middlewares/isAuthenticated'
import ListMaquinasController from '@modules/maquinas/infra/http/controllers/list_maquinas_controller'

const maquinasRouter = Router()

const listMaquinasController = container.resolve(ListMaquinasController)

maquinasRouter.get('/', isAuthenticated, (req, res) =>
  listMaquinasController.index(req, res),
)

export default maquinasRouter
