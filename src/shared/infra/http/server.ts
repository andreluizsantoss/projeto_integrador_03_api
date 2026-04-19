import { app } from './app';
import { initializeDatabase } from '@shared/infra/database/data-source';
import { logger } from '@shared/logger/logger';
import { env } from '@shared/env';

async function bootstrap(): Promise<void> {
  await initializeDatabase();
  logger.info('Database connected successfully');

  app.listen(env.PORT, () => {
    logger.info(`Server running on port ${env.PORT} [${env.NODE_ENV}]`);
  });
}

bootstrap().catch(err => {
  logger.error('Failed to start server', err);
  process.exit(1);
});
