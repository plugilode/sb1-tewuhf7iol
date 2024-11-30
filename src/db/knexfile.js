import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'database.sqlite')
  },
  useNullAsDefault: true,
  migrations: {
    directory: path.resolve(__dirname, 'migrations'),
    loadExtensions: ['.js']
  },
  seeds: {
    directory: path.resolve(__dirname, 'seeds'),
    loadExtensions: ['.js']
  },
  pool: {
    min: 1,
    max: 1,
    afterCreate: (conn, cb) => {
      conn.run('PRAGMA foreign_keys = ON', cb);
    }
  }
};