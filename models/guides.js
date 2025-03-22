import { Model } from "objection";
import Games from "./games.js";
import Timings from "./timings.js";

class Guides extends Model {
  static get tableName() {
    return 'guides_table';
  }

// Это не схема самой таблицы, схема таблицы описывается в миграциях
// Это для валидации данных которые вставляются в таблицу
static get jsonSchema() {
  return {
    type: 'object',
    required: ['set_name', 'fk_game_id'],
    properties: {
      id: {type: 'integer'},
      set_name: {type: 'string', minLength: 1, maxLength: 255},
      description: {type: 'string', minLength: 1, maxLength: 255},
      creator: {type: 'string', maxLength: 255},
      url_to_pb: {type: 'string', maxLength: 255},
      fk_game_id: {type: 'integer'}
    }
  }
}

  static get relationMappings() {
    return {
      games: {
        relation: Model.BelongsToOneRelation,
        modelClass: Games,
        join: {
          from: 'guides_table.fk_game_id',
          to: 'games_table.id'
        }
      },
      timings: {
        relation: Model.HasManyRelation,
        modelClass: Timings,
        join: {
          from: 'guides_table.id',
          to: 'timings.fk_guide_id'
        }
      }
    }
  }
}

export default Guides;