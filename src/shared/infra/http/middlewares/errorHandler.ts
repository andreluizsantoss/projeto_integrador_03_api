import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError } from '@shared/errors/AppError';
import { logger } from '@shared/logger/logger';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
): Response {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      message: 'Validation error',
      errors: err.flatten().fieldErrors,
    });
  }

  logger.error(err);

  return res.status(500).json({
    message:
      process.env.NODE_ENV === 'production'
        ? 'Internal server error'
        : err.message,
  });
}
