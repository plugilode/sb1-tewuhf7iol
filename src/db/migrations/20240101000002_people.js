export async function up(knex) {
  return knex.schema.createTable('people', (table) => {
    table.uuid('id').primary();
    table.uuid('company_id').references('id').inTable('companies').onDelete('CASCADE');
    table.string('full_name').notNullable();
    table.string('position').nullable();
    table.string('department').nullable();
    table.string('email').nullable();
    table.string('phone').nullable();
    table.string('linkedin_url').nullable();
    table.text('bio').nullable();
    table.text('work_history').nullable();
    table.uuid('created_by').references('id').inTable('users');
    table.uuid('updated_by').references('id').inTable('users');
    table.timestamps(true, true);
  });
}

export async function down(knex) {
  return knex.schema.dropTable('people');
}