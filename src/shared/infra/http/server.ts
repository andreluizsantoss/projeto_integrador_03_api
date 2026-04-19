import { logger } from '@shared/logger/logger';
import { app } from './app';
import { env } from '@shared/env';
import { initializeDatabase } from '@shared/infra/database/data-source';

initializeDatabase().then(() => {
  app.listen(env.PORT, () => {
    logger.info(`🚀 Server started on port ${env.PORT}!`);
  });
});
