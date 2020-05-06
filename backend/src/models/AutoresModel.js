import Model from './Model';

class AutoresModel extends Model {
  static get tableName() {
    return 'autores';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    import Devocoes from './DevocoesModel';

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
        nome: { type: 'string', minLength: 1, maxLength: 100 },
        data_nasc: { type: 'date' },
        biografia: { type: 'text' },
        avatar: { type: 'string', minLength: 1, maxLength: 20 },
        created_at: { type: 'datetime' },
        updated_at: { type: 'datetime' },
      },
    };
  }
}

export default AutoresModel;
