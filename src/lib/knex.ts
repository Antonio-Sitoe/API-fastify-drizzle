import { Knex as KnexDB } from 'knex'

export const config = {
  client: 'sqlite',
  connection: {
    filename: './temp/app.db',
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
}

export const knex = new KnexDB.Client(config)
