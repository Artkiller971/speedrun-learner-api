import { Model } from "objection";
import Guides from "./guides.js";

class Games extends Model {
  static get tableName() {
    return 'games_table';
  }
// Это не схема самой таблицы, схема таблицы описывается в миграциях
// Это видимо для валидации инпутов

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['game_name', 'game_alias'],
      properties: {
        id: {type: 'integer'},
        game_name: {type: 'string', minLength: 1, maxLength: 255},
        game_alias: {type: 'string', minLength: 1, maxLength: 255},
        description: {type: 'string', maxLength: 255},
      }
    }
  }

  static get relationMappings() {
    return {
    guides: {
      relation: Model.HasManyRelation,
      modelClass: Guides,
      join: {
        from: 'games_table.id',
        to:'guides_table.fk_game_id'
      }
    },
  }}
}

export default Games;