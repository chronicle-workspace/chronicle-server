import Joi from "joi";

export const ConfigValidator = Joi.object({
  PORT: Joi.number().default(3000),
  NODE_ENV: Joi.string()
    .valid("development", "production", "test")
    .default("production"),
  CORS_ORIGIN: Joi.string().default("*"),
  CORS_METHODS: Joi.string().default("GET,PUT,POST,DELETE,PATCH"),
  CORS_CREDENTIALS: Joi.boolean().default(true),
  CORS_PREFLIGHT: Joi.boolean().default(false),
  CORS_OPTIONS_STATUS: Joi.number().default(204),
  SWAGGER_ENABLED: Joi.boolean(),
  CACHE_TTL: Joi.number().default(60 * 1000),
  CACHE_MAX: Joi.number().default(100),
  DATABASE_URL: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_ACCESS_TOKEN_EXP: Joi.string().default("7d"),
  S3_PUBLIC_URL: Joi.string().required(),
  S3_ENDPOINT: Joi.string().required(),
  S3_BUCKET_NAME: Joi.string().required(),
  S3_REGION: Joi.string().required(),
  S3_ACCESS_KEY: Joi.string().required(),
  S3_SECRET_KEY: Joi.string().required(),
  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().default(6379),
  MESSAGE_URL: Joi.string().required(),
});
