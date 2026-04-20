import { Request, Response } from 'express'
import { injectable } from 'tsyringe'
import { z } from 'zod'
import { container } from 'tsyringe'
import { AuthenticateService } from '@authenticate/services/authenticate_service'
import { InvalidCredentialsError } from '@shared/errors/InvalidCredentialsError'
import { logger } from '@shared/logger/logger'

@injectable()
export default class AuthenticateController {
  public async session(request: Request, response: Response): Promise<Response> {
    const bodySchema = z.object({
      nome: z.string(),
      pin: z.number().int(),
    })

    const parseResult = bodySchema.safeParse(request.body)
    if (!parseResult.success) {
      return response.status(400).json({
        message: 'Validation failed',
        errors: parseResult.error.issues,
      })
    }

    const { nome, pin } = parseResult.data

    try {
      const service = container.resolve(AuthenticateService)
      const { access_token, refresh_token } = await service.execute({ nome, pin })

      logger.info(`Operador "${nome}" authenticated successfully.`, {
        ip: request.ip,
        userAgent: request.get('User-Agent'),
      })

      return response.status(200).json({ access_token, refresh_token })
    } catch (err) {
      if (err instanceof InvalidCredentialsError) {
        logger.warn(`Authentication failed for "${nome}": Invalid credentials.`, {
          path: request.path,
        })
        return response.status(400).json({ message: err.message })
      }

      logger.error(`Unexpected error in authentication for "${nome}"`, {
        error: (err as Error).message,
        path: request.path,
      })
      return response.status(500).json({ message: 'Internal Server Error' })
    }
  }
}
