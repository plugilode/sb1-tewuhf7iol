export async function up(knex) {
  return knex.schema.createTable('audit_logs', (table) => {
    table.uuid('id').primary();
    table.uuid('user_id').references('id').inTable('users');
    table.string('action').notNullable();
    table.string('entity_type').notNullable();
    table.uuid('entity_id').notNullable();
    table.text('changes').nullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
  });
}

export async function down(knex) {
  return knex.schema.dropTable('audit_logs');
}