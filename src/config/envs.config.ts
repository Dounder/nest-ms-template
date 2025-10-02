import 'dotenv/config';
import joi from 'joi';

interface EnvVars {
  PORT: number;
  STAGE: 'dev' | 'prod' | 'staging';
  PG_USER: string;
  PG_PASSWORD: string;
  PG_DB: string;
  DATABASE_URL: string;
  NATS_SERVERS: string[];
}

const envSchema = joi
  .object({
    PORT: joi.number().default(3000),
    STAGE: joi.string().valid('dev', 'prod', 'staging').default('dev'),
    PG_USER: joi.string().required(),
    PG_PASSWORD: joi.string().required(),
    PG_DB: joi.string().required(),
    DATABASE_URL: joi.string().required(),
    NATS_SERVERS: joi.array().items(joi.string()).required(),
  })
  .unknown(true);

const { error, value } = envSchema.validate({
  ...process.env,
  NATS_SERVERS: process.env.NATS_SERVERS?.split(',') || [],
}) as {
  error: Error | undefined;
  value: EnvVars;
};

if (error) throw new Error(`Config validation error: ${error.message}`);

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  stage: envVars.STAGE,
  pgUser: envVars.PG_USER,
  pgPassword: envVars.PG_PASSWORD,
  pgDb: envVars.PG_DB,
  databaseUrl: envVars.DATABASE_URL,
  natsServers: envVars.NATS_SERVERS,
};
