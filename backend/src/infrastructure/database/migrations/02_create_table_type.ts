import * as Knex from 'knex'

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('type', (table: Knex.TableBuilder) => {
    table.increments('id')
    table.string('name').notNullable()
  })
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('type')
}
