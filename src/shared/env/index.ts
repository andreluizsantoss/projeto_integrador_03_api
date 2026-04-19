import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().default(3000),

  DB_HOST: z.string(),
  DB_PORT: z.coerce.number().default(3306),
  DB_NAME: z.string(),
  DB_USER: z.string(),
  DB_PASS: z.string(),

  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string().default('15m'),

  REFRESH_TOKEN_SECRET: z.string(),
  REFRESH_TOKEN_EXPIRES_IN: z.string().default('7d'),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  const errorMessage = '❌ Invalid environment variables';
  const formattedError = _env.error.format();
  console.error(errorMessage, formattedError);
  throw new Error(errorMessage);
}

export const env = _env.data;
