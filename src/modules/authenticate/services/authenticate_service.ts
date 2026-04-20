import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'
import { env } from '@shared/env'
import { IAuthenticateOperador } from '@authenticate/domain/models/i_authenticate_operador'
import { IAuthenticateResponse } from '@authenticate/domain/models/i_authenticate_response'
import { IAuthenticateRepository } from '@authenticate/domain/repositories/i_authenticate_repository'
import { InvalidCredentialsError } from '@shared/errors/InvalidCredentialsError'

@injectable()
export class AuthenticateService {
  constructor(
    @inject('AuthenticateRepository')
    private authenticateRepository: IAuthenticateRepository,
  ) {}

  async execute({ nome, pin }: IAuthenticateOperador): Promise<IAuthenticateResponse> {
    const operador = await this.authenticateRepository.findOperadorByNome(nome)

    if (!operador) {
      throw new InvalidCredentialsError()
    }

    if (operador.pin !== pin) {
      throw new InvalidCredentialsError()
    }

    const access_token = sign({}, env.JWT_SECRET, {
      subject: operador.idOperador.toString(),
      expiresIn: env.JWT_EXPIRES_IN,
    })

    const refresh_token = sign({}, env.REFRESH_TOKEN_SECRET, {
      subject: operador.idOperador.toString(),
      expiresIn: env.REFRESH_TOKEN_EXPIRES_IN,
    })

    return { access_token, refresh_token }
  }
}
