export async function up(knex) {
  return knex.schema.createTable('media', (table) => {
    table.uuid('id').primary();
    table.uuid('company_id').references('id').inTable('companies').onDelete('CASCADE');
    table.uuid('person_id').references('id').inTable('people').onDelete('CASCADE');
    table.string('type').notNullable();
    table.string('url').notNullable();
    table.string('title').nullable();
    table.text('description').nullable();
    table.text('metadata').nullable();
    table.uuid('created_by').references('id').inTable('users');
    table.uuid('updated_by').references('id').inTable('users');
    table.timestamps(true, true);
  });
}

export async function down(knex) {
  return knex.schema.dropTable('media');
}