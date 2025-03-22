import { Model } from "objection";
import Guides from "./guides.js";

class Timings extends Model {
  static get tableName() {
    return 'timings';
  }

// Это не схема самой таблицы, схема таблицы описывается в миграциях
// Это видимо для валидации инпутов

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['timing', 'timing_name', 'difficulty_level', 'severity_level', 'fk_guide_id'],
      properties: {
        id: {type: 'integer'},
        timing: {type: 'integer', minLength: 1, maxLength: 255},
        timing_name: {type: 'string', minLength: 1, maxLength: 255},
        description: {type: 'string', maxLength: 255},
        difficulty_level: {type: 'string', minLength: 1, maxLength: 255},
        severity_level: {type: 'string', minLength: 1, maxLength: 255},
        url_to_skip: {type: 'string', minLength: 1, maxLength: 255},
        fk_guide_id: {type: 'integer'},
      }
    }
  }

  static get relationMappings() {
    return {
      guides: {
        relation: Model.BelongsToOneRelation,
        modelClass: Guides,
        join: {
          from: 'timings.fk_guide_id',
          to: 'guides_table.id'
        }
      }
    }
  }
}

export default Timings;