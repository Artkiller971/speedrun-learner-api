export const up = (knex) => (
  knex.schema.createTable('timings', (table) => {
    table.increments('id').primary().notNullable();
    table.integer('timing').notNullable();
    table.string('timing_name').notNullable();
    table.string('description').notNullable();
    table.string('difficulty_level').notNullable();
    table.string('severity_level').notNullable();
    table.string('url_to_skip').notNullable();

    table.integer('fk_guide_id')
      .unsigned()
      .references('id')
      .inTable('guides_table')
      .onDelete('SET NULL')
      .index();
  })
)

export const down = (knex) => knex.schema.dropTable('guides');