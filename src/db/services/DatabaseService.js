import db from '../index.js';

export class DatabaseService {
  static async initialize() {
    try {
      // Test database connection
      await db.raw('SELECT 1');
      console.log('Database connection successful');
      return true;
    } catch (error) {
      console.error('Database connection failed:', error);
      return false;
    }
  }

  static async healthCheck() {
    try {
      const tables = await db.raw(`
        SELECT name FROM sqlite_master 
        WHERE type='table' 
        AND name NOT LIKE 'sqlite_%'
      `);
      return {
        status: 'healthy',
        tables: tables.map(t => t.name),
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        status: 'error',
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }
}