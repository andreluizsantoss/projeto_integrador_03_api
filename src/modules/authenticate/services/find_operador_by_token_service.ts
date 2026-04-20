import { inject, injectable } from 'tsyringe'
import { Operador } from '@modules/operadores/infra/typeorm/entities/Operador'
import { IAuthenticateRepository } from '@authenticate/domain/repositories/i_authenticate_repository'
import { UserNotFoundError } from '@shared/errors/UserNotFoundError'

@injectable()
export class FindOperadorByTokenService {
  constructor(
    @inject('AuthenticateRepository')
    private authenticateRepository: IAuthenticateRepository,
  ) {}

  async execute(id: number): Promise<Omit<Operador, 'pin'>> {
    const operador = await this.authenticateRepository.findOperadorById(id)

    if (!operador) {
      throw new UserNotFoundError()
    }

    const { pin: _, ...operadorWithoutPin } = operador

    return operadorWithoutPin
  }
}
