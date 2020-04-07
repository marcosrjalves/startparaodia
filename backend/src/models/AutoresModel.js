import Model from './Model';

class AutoresModel extends Model {
  static get tableName() {
    return 'autores';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    const Devocoes = require('./DevocoesModel');

    return {
      devocoes: {
        relation: Model.HasManyRelation,
        modelClass: Devocoes,
        join: {
          from: 'autores.id',
          to: 'devocoes.autor_id',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['nome', 'dataNasc', 'biografia'],
      properties: {
        id: { type: 'uuid' },
        nome: { type: 'string', minLength: 1, maxLength: 255 },
        dataNasc: { type: 'date' },
        biografia: { type: 'text' },
        createdAt: { type: 'datetime' },
        updatedAt: { type: 'datetime' },
      },
    };
  }
}

export default AutoresModel;
