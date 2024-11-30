export async function up(knex) {
  return knex.schema.createTable('companies', (table) => {
    table.uuid('id').primary();
    table.string('name').notNullable();
    table.string('domain').notNullable().unique();
    table.text('description').nullable();
    table.string('logo_url').nullable();
    table.string('website').nullable();
    table.string('country').nullable();
    table.string('city').nullable();
    table.string('address').nullable();
    table.string('postal_code').nullable();
    table.string('industry').nullable();
    table.text('social_media').nullable();
    table.text('metrics').nullable();
    table.text('tags').nullable();
    table.uuid('created_by').references('id').inTable('users');
    table.uuid('updated_by').references('id').inTable('users');
    table.timestamps(true, true);
  });
}

export async function down(knex) {
  return knex.schema.dropTable('companies');
}