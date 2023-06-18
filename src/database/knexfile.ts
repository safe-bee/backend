import { PG, ENV } from "../config";

const knexConfig = {
  development: {
    client: "pg",
    connection: {
      host: "database-1.cikg1f5vnebn.us-east-1.rds.amazonaws.com" || PG.HOST,
      database: "postgres" || PG.DB_NAME,
      user: "postgres" || PG.USER,
      password: "eztrainer" || PG.PASSWORD,
      port: 4000 || PG.PORT,
    },
    pool: {
      min: 1,
      max: 1,
    },
    migrations: {
      directory: `${__dirname}/migrations`,
      tableName: "knex_migrations",
    },
    seeds: {
      directory: `${__dirname}/seeds`,
    },
  },
  /*
    migrations: {
      directory: './src/db/migrations',
    },
    seeds: {
      directory: './src/db/seeds',
    },
  },
  test: {
    client: 'pg',
    connection: {
      host: DB_HOST,
      database: DB_NAME,
      user: DB_USER,
      password: DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './src/db/migrations',
    },
    seeds: {
      directory: './src/db/seeds',
    },
  },
  production: {
    client: 'pg',
    connection: {
      host: DB_HOST,
      database: DB_NAME,
      user: DB_USER,
      password: DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './src/db/migrations',
    },
    seeds: {
      directory: './src/db/seeds',
    },
  }, */
};

const env = process.env.NODE_ENV || ENV.DEVELOPMENT;
const configs = knexConfig[env];

export default configs;
