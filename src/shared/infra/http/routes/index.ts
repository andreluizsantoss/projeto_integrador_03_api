import { Router } from 'express'
import authenticateRouter from '@authenticate/infra/http/routes/authenticate_routes'
import operadoresRouter from '@modules/operadores/infra/http/routes/operadores_routes'
import maquinasRouter from '@modules/maquinas/infra/http/routes/maquinas_routes'

export const routes = Router()

routes.use('/auth', authenticateRouter)
routes.use('/operadores', operadoresRouter)
routes.use('/maquinas', maquinasRouter)
