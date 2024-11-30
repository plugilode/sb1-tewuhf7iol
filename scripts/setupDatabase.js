import { fileURLToPath } from 'url';
import path from 'path';
import knex from 'knex';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const knexfile = {
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, '../src/db/database.sqlite')
  },
  useNullAsDefault: true,
  migrations: {
    directory: path.resolve(__dirname, '../src/db/migrations'),
    loadExtensions: ['.js']
  },
  seeds: {
    directory: path.resolve(__dirname, '../src/db/seeds'),
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

async function setupDatabase() {
  console.log('Initializing database...');
  
  try {
    // Ensure database directory exists
    const dbDir = path.dirname(knexfile.connection.filename);
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }

    // Remove existing database file if it exists
    if (fs.existsSync(knexfile.connection.filename)) {
      fs.unlinkSync(knexfile.connection.filename);
      console.log('Removed existing database file');
    }

    const db = knex(knexfile);

    console.log('Running migrations...');
    await db.migrate.latest();

    console.log('Running seeds...');
    await db.seed.run();

    console.log('Database setup completed successfully!');
    await db.destroy();
    process.exit(0);
  } catch (error) {
    console.error('Error setting up database:', error);
    process.exit(1);
  }
}

setupDatabase();