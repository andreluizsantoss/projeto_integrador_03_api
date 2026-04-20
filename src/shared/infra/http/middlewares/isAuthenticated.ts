import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import { env } from '@shared/env'
import { AppError } from '@shared/errors/AppError'

export function isAuthenticated(
  req: Request,
  _res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    throw new AppError('Token not provided.', 401)
  }
  const [, token] = authHeader.split(' ')
  try {
    const decoded = verify(token, env.JWT_SECRET) as { sub: string }
    req.user = { id: Number(decoded.sub) }
    return next()
  } catch {
    throw new AppError('Invalid token.', 401)
  }
}
