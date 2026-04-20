import { Router } from 'express'
import { container } from 'tsyringe'
import { isAuthenticated } from '@shared/infra/http/middlewares/isAuthenticated'
import AuthenticateController from '@authenticate/infra/http/controllers/authenticate_controller'
import FindOperadorByTokenController from '@authenticate/infra/http/controllers/find_operador_by_token_controller'
import UpdateAccessTokenController from '@authenticate/infra/http/controllers/update_access_token_controller'

const authenticateRouter = Router()

const authenticateController = container.resolve(AuthenticateController)
const findOperadorByTokenController = container.resolve(FindOperadorByTokenController)
const updateAccessTokenController = container.resolve(UpdateAccessTokenController)

authenticateRouter.post('/session', (req, res) =>
  authenticateController.session(req, res),
)
authenticateRouter.post('/find', isAuthenticated, (req, res) =>
  findOperadorByTokenController.show(req, res),
)
authenticateRouter.post('/refresh', (req, res) =>
  updateAccessTokenController.update(req, res),
)

export default authenticateRouter
