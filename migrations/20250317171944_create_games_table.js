export const up = (knex) => (
  knex.schema.createTable('games_table', (table) => {
    table.increments('id').primary().notNullable();
    table.string('game_name').notNullable();
    table.string('game_alias').notNullable();
    table.string('description').notNullable();
  })
);

export const down = (knex) => knex.schema.dropTable('games');
