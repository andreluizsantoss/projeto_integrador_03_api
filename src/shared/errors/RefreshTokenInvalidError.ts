import { AppError } from './AppError'

export class RefreshTokenInvalidError extends AppError {
  constructor(message = 'Invalid refresh token.') {
    super(message, 401)
  }
}
