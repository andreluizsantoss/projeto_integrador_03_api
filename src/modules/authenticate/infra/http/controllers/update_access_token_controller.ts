import { Request, Response } from 'express'
import { injectable } from 'tsyringe'
import { container } from 'tsyringe'
import { z } from 'zod'
import { UpdateAccessTokenService } from '@authenticate/services/update_access_token_service'
import { RefreshTokenInvalidError } from '@shared/errors/RefreshTokenInvalidError'
import { UserNotFoundError } from '@shared/errors/UserNotFoundError'
import { logger } from '@shared/logger/logger'

@injectable()
export default class UpdateAccessTokenController {
  public async update(request: Request, response: Response): Promise<Response> {
    const bodySchema = z.object({
      refreshToken: z.string(),
    })

    const parseResult = bodySchema.safeParse(request.body)
    if (!parseResult.success) {
      return response.status(400).json({
        message: 'Validation failed',
        errors: parseResult.error.issues,
      })
    }

    const { refreshToken } = parseResult.data

    try {
      const service = container.resolve(UpdateAccessTokenService)
      const { access_token, refresh_token } = await service.execute({ refreshToken })
      return response.status(200).json({ access_token, refresh_token })
    } catch (err) {
      if (err instanceof RefreshTokenInvalidError) {
        logger.warn('Refresh token invalid.', { error: err.message, path: request.path })
        return response.status(401).json({ message: err.message })
      }
      if (err instanceof UserNotFoundError) {
        return response.status(404).json({ message: err.message })
      }

      logger.error('Unexpected error on token refresh.', {
        error: (err as Error).message,
        path: request.path,
      })
      return response.status(500).json({ message: 'Internal Server Error' })
    }
  }
}
