import Model from './Model';

class UsuariosDevocoesModel extends Model {
  static get tableName() {
    return 'usuarios_devocoes';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    // import Usuarios from './UsuariosModel';
    // import Devocoes from './DevocoesModel';

    return {
      devocoes: {
        relation: Model.BelongsToOneRelation,
        modelClass: UsuariosDevocoes,
        join: {
          from: 'usuarios_devocoes.usuario_id',
          to: 'usuarios.id',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['nome', 'dataNasc', 'email', 'password', 'autor'],
      properties: {
        id: { type: 'uuid' },
        nome: { type: 'string', minLength: 1, maxLength: 255 },
        dataNasc: { type: 'date' },
        email: { type: 'email' },
        password: { type: 'text' },
        autor: { type: 'boolean' },
        dtCriacao: { type: 'datetime' },
        dtAlteracao: { type: 'datetime' },
      },
    };
  }
}

export default DevocoesModel;
