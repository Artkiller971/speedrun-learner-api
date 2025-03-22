export const up = (knex) => (
  knex.schema.createTable('guides_table', (table) => {
    table.increments('id').primary().notNullable();
    table.string('set_name').notNullable();
    table.string('description').notNullable();
    table.string('creator').notNullable();
    table.string('url_to_pb').notNullable();

    table.integer('fk_game_id')
      .unsigned()
      .references('id')
      .inTable('games_table')
      .onDelete('SET NULL')
      .index();
  })
)

export const down = (knex) => knex.schema.dropTable('guides');
