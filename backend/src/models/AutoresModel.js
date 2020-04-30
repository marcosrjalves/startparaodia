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
    import Usuarios from './UsuariosModel';

    return {
      devocoes: {
        relation: Model.HasManyRelation,
        modelClass: Devocoes,
        join: {
          from: 'autores.id',
          to: 'devocoes.autor_id',
        },
      },

      usuario: {
        relation: Model.BelongsToOneRelation,
        modelClass: Usuarios,
        join: {
          from: 'autores.usuario_id',
          to: 'usuarios.id',
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
        email: { type: 'string', minLength: 1, maxLength: 255 },
        data_nasc: { type: 'date' },
        biografia: { type: 'text' },
        password_hash: { type: 'string', minLength: 1, maxLength: 255 },
        avatar: { type: 'string', minLength: 1, maxLength: 20 },
        created_at: { type: 'datetime' },
        updated_at: { type: 'datetime' },
      },
    };
  }
}

export default AutoresModel;
