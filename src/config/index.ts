export const PG = {
  PORT: process.env.PG_PORT,
  HOST: process.env.PG_HOST,
  DB_NAME: process.env.PG_DB_NAME,
  USER: process.env.PG_USER,
  PASSWORD: process.env.PG_PASSWORD
};

export const ENV = {
  DEVELOPMENT: 'development',
  TEST:  'test',
  PRODUCTION: 'production',
};