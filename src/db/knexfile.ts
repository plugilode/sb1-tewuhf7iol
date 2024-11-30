import { Knex } from 'knex';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'database.sqlite')
  },
  useNullAsDefault: true,
  migrations: {
    directory: path.resolve(__dirname, 'migrations')
  },
  seeds: {
    directory: path.resolve(__dirname, 'seeds')
  },
  pool: {
    min: 1,
    max: 1,
    afterCreate: (conn: any, cb: any) => {
      conn.run('PRAGMA foreign_keys = ON', cb);
    }
  }
};

export default config;