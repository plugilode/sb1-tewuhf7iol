import db from '../index.js';
import { v4 as uuidv4 } from 'uuid';

export class CompanyService {
  static async create(companyData, userId) {
    const id = uuidv4();
    await db('companies').insert({
      id,
      ...companyData,
      social_media: JSON.stringify(companyData.social_media || {}),
      metrics: JSON.stringify(companyData.metrics || {}),
      tags: JSON.stringify(companyData.tags || []),
      created_by: userId,
      updated_by: userId,
      created_at: new Date(),
      updated_at: new Date()
    });
    return this.getById(id);
  }

  static async getById(id) {
    const company = await db('companies').where({ id }).first();
    if (company) {
      company.social_media = JSON.parse(company.social_media);
      company.metrics = JSON.parse(company.metrics);
      company.tags = JSON.parse(company.tags);
    }
    return company;
  }

  static async search(query) {
    const results = await db('search_index')
      .where('entity_type', 'company')
      .whereRaw('searchable_text LIKE ?', [`%${query}%`])
      .orderBy('relevance_score', 'desc');

    return Promise.all(
      results.map(result => this.getById(result.entity_id))
    );
  }

  static async update(id, data, userId) {
    if (data.social_media) {
      data.social_media = JSON.stringify(data.social_media);
    }
    if (data.metrics) {
      data.metrics = JSON.stringify(data.metrics);
    }
    if (data.tags) {
      data.tags = JSON.stringify(data.tags);
    }

    await db('companies')
      .where({ id })
      .update({
        ...data,
        updated_by: userId,
        updated_at: new Date()
      });

    return this.getById(id);
  }
}