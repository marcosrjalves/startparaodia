import Model from './Model';

class UsuariosDevocoesModel extends Model {
  static get tableName() {
    return 'usuarios_devocoes';
  }

  static get idColumn() {
    return 'id';
  }

  $beforeInsert() {
    this.data_leitura = new Date();
  }

  static get relationMappings() {
    import Usuarios from './UsuariosModel';
    import Devocoes from './DevocoesModel';

    return {
      devocoes: {
        relation: Model.BelongsToOneRelation,
        modelClass: Devocoes,
        join: {
          from: 'usuarios_devocoes.usuario_id',
          to: 'devocoes.id',
        },
      },

      usuarios: {
        relation: Model.BelongsToOneRelation,
        modelClass: Usuarios,
        join: {
          from: 'usuarios_devocoes.devocao_id',
          to: 'usuarios.id',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [ 'usuario_id', 'devocao_id' ],
      properties: {
        id: { type: 'uuid' },
        usuario_id: { type: 'integer' },
        devocao_id: { type: 'integer' },
        data_leitura: { type: 'datetime' },
        created_at: { type: 'datetime' },
        updated_at: { type: 'datetime' },
      },
    };
  }
}

export default UsuariosDevocoesModel;
