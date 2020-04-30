import Model from './Model';

class DevocoesModel extends Model {

    static get tableName() {
        return 'devocoes';
    }

    static get idColumn() {
        return 'id';
    }

    static get relationMappings() {
        import Autor from './AutoresModel';
        import Usuarios from './UsuariosModel';
        // const UsuariosDevocoes = require('./UsuariosDevocoesModel');
        
        return {
            autor: {
                relation: Model.BelongsToOneRelation,
                modelClass: Autor,
                join: {
                    from: 'devocoes.autor_id',
                    to: 'autores.id'
                }
            },

            usuarios: {
                relation: Model.ManyToManyRelation,
                modelClass: Usuarios,
                join: {
                    from: 'devocoes.id',
                    through: {
                        // modelClass: UsuariosDevocoes,
                        from: 'usuarios_devocoes.devocao_id',
                        to: 'usuarios_devocoes.usuario_id',
                    },
                    to: 'usuarios.id'
                }
            },
        };
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['titulo', 'dataTexto', 'texto', 'autor_id'],
            properties: {
                id: { type: 'uuid' },
                titulo: { type: 'string', minLength: 1, maxLength: 100 },
                data_texto: { type: 'date' },
                texto: { type: 'text' },
                created_at: { type: 'datetime' },
                updated_at: { type: 'datetime' },
            }
        };
    }

}

export default DevocoesModel;