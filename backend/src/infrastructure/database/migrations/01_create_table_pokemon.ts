import * as Knex from 'knex'

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('pokemon', (table: Knex.TableBuilder) => {
    table.string('id').primary('id')

    table.string('name').notNullable()

    table.string('type_id').notNullable()

    table.integer('number')

    table
      .foreign('type_id')
      .references('id')
      .inTable('type')
      .onDelete('CASCADE')
  })
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('pokemon')
}
