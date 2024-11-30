export async function up(knex) {
  return knex.schema.createTable('search_index', (table) => {
    table.uuid('id').primary();
    table.string('entity_type').notNullable();
    table.uuid('entity_id').notNullable();
    table.text('searchable_text').notNullable();
    table.text('keywords').nullable();
    table.decimal('relevance_score', 4, 2).nullable();
    table.timestamps(true, true);
    table.index(['entity_type', 'entity_id']);
  });
}

export async function down(knex) {
  return knex.schema.dropTable('search_index');
}