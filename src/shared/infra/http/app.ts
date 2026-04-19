import 'reflect-metadata';
import '@shared/infra/http/container';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { routes } from './routes';
import { ZodError } from 'zod';
import { AppError } from '@shared/errors/AppError';
import { logger } from '@shared/logger/logger';

const app = express();

app.set('trust proxy', true);
app.use(cors());
app.use(express.json());

app.use(routes);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        message: error.message,
      });
    }

    if (error instanceof ZodError) {
      logger.warn('Validation error occurred', {
        message: error.message,
        issues: error.format(),
        path: request.path,
        method: request.method,
        ip: request.ip,
      });
      return response.status(400).send({
        message: 'Validation error',
        issues: error.format(),
      });
    }

    logger.error('Unhandled internal server error', {
      message: error.message,
      stack: error.stack,
      path: request.path,
      method: request.method,
      ip: request.ip,
    });

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

export { app };
