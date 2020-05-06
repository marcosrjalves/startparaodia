
exports.up = function(knex) {
    return knex.schema.createTable('usuarios_devocoes', function(table) {
        table.increments('id').primary().unsigned();
        table.integer('usuario_id').notNullable().unsigned();
        table.foreign('usuario_id').references('id').inTable('usuarios');
        table.integer('devocao_id').notNullable().unsigned();
        table.foreign('devocao_id').references('id').inTable('devocoes');
        table.datetime('data_leitura');
        table.timestamps(false, true);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('usuarios_devocoes');
};
