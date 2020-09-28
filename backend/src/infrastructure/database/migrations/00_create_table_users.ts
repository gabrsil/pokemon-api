import * as Knex from 'knex'

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('user', (table: Knex.TableBuilder) => {
    table.string('id').primary('id')
    table.string('name').notNullable()
    table.string('email').notNullable()
    table.string('password').notNullable()
  })
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('user')
}
