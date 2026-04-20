import { container } from 'tsyringe'
import { IAuthenticateRepository } from '@authenticate/domain/repositories/i_authenticate_repository'
import { AuthenticateRepository } from '@authenticate/infra/typeorm/repositories/authenticate_repository'
import { IOperadoresRepository } from '@modules/operadores/domain/repositories/i_operadores_repository'
import { OperadoresRepository } from '@modules/operadores/infra/typeorm/repositories/operadores_repository'

container.registerSingleton<IAuthenticateRepository>(
  'AuthenticateRepository',
  AuthenticateRepository,
)

container.registerSingleton<IOperadoresRepository>(
  'OperadoresRepository',
  OperadoresRepository,
)

export { container }
