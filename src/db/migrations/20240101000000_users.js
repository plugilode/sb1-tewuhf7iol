export async function up(knex) {
  return knex.schema.createTable('users', (table) => {
    table.uuid('id').primary();
    table.string('username').notNullable().unique();
    table.string('password_hash').notNullable();
    table.string('email').notNullable().unique();
    table.string('full_name').notNullable();
    table.string('role').notNullable().defaultTo('USER');
    table.text('permissions').notNullable().defaultTo('[]');
    table.datetime('last_login').nullable();
    table.boolean('is_active').notNullable().defaultTo(true);
    table.timestamps(true, true);
  });
}

export async function down(knex) {
  return knex.schema.dropTable('users');
}