import db from '../index.js';
import { v4 as uuidv4 } from 'uuid';

export class UserService {
  static async create(userData) {
    const id = uuidv4();
    await db('users').insert({
      id,
      ...userData,
      permissions: JSON.stringify(userData.permissions || []),
      created_at: new Date(),
      updated_at: new Date()
    });
    return this.getById(id);
  }

  static async getById(id) {
    const user = await db('users').where({ id }).first();
    if (user) {
      user.permissions = JSON.parse(user.permissions);
    }
    return user;
  }

  static async getByUsername(username) {
    const user = await db('users').where({ username }).first();
    if (user) {
      user.permissions = JSON.parse(user.permissions);
    }
    return user;
  }

  static async update(id, data) {
    if (data.permissions) {
      data.permissions = JSON.stringify(data.permissions);
    }
    await db('users')
      .where({ id })
      .update({
        ...data,
        updated_at: new Date()
      });
    return this.getById(id);
  }

  static async authenticate(username, password) {
    // In production, use proper password hashing
    const user = await db('users')
      .where({ 
        username,
        password_hash: password,
        is_active: true 
      })
      .first();
    
    if (user) {
      await this.update(user.id, {
        last_login: new Date()
      });
      user.permissions = JSON.parse(user.permissions);
    }
    
    return user;
  }
}