import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { env } from '@shared/env';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASS,
  database: env.DB_NAME,
  synchronize: false,
  logging: env.NODE_ENV === 'development',
  entities: ['src/shared/infra/database/entities/*.ts'],
  migrations: ['src/shared/infra/database/migrations/*.ts'],
});

export async function initializeDatabase(): Promise<void> {
  await AppDataSource.initialize();
}
