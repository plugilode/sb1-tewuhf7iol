export async function up(knex) {
  return knex.schema.createTable('ai_analysis', (table) => {
    table.uuid('id').primary();
    table.uuid('company_id').references('id').inTable('companies').onDelete('CASCADE');
    table.string('analysis_type').notNullable();
    table.text('results').notNullable();
    table.decimal('confidence_score', 4, 2).nullable();
    table.text('metadata').nullable();
    table.uuid('created_by').references('id').inTable('users');
    table.timestamps(true, true);
  });
}

export async function down(knex) {
  return knex.schema.dropTable('ai_analysis');
}