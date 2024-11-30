import knex from 'knex';
import config from './knexfile.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure database directory exists
const dbDirectory = path.dirname(config.connection.filename);
if (!fs.existsSync(dbDirectory)) {
  fs.mkdirSync(dbDirectory, { recursive: true });
}

// Initialize database connection
const db = knex(config);

// Export database instance
export default db;