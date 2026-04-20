import { sign, verify } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'
import { env } from '@shared/env'
import { IAuthenticateResponse } from '@authenticate/domain/models/i_authenticate_response'
import { IAuthenticateRepository } from '@authenticate/domain/repositories/i_authenticate_repository'
import { IUpdateTokenInput } from '@authenticate/domain/models/i_update_token_input'
import { RefreshTokenInvalidError } from '@shared/errors/RefreshTokenInvalidError'
import { UserNotFoundError } from '@shared/errors/UserNotFoundError'

type JwtPayload = {
  sub: string
}

@injectable()
export class UpdateAccessTokenService {
  constructor(
    @inject('AuthenticateRepository')
    private authenticateRepository: IAuthenticateRepository,
  ) {}

  async execute({ refreshToken }: IUpdateTokenInput): Promise<IAuthenticateResponse> {
    let userId: string

    try {
      const decoded = verify(refreshToken, env.REFRESH_TOKEN_SECRET) as JwtPayload
      userId = decoded.sub
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'TokenExpiredError') {
          throw new RefreshTokenInvalidError('Refresh token expired.')
        }
        if (error.name === 'JsonWebTokenError') {
          throw new RefreshTokenInvalidError(`Invalid refresh token: ${error.message}.`)
        }
      }
      throw new RefreshTokenInvalidError()
    }

    const operador = await this.authenticateRepository.findOperadorById(Number(userId))

    if (!operador) {
      throw new UserNotFoundError()
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
