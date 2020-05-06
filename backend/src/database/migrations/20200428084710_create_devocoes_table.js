
exports.up = function(knex) {
    return knex.schema.createTable('devocoes', function(table) {
        table.increments('id').primary().unsigned();
        table.string('titulo', 100).notNullable();
        table.datetime('data_texto').unique();
        table.text('texto').notNullable();
        table.integer('autor_id').notNullable().unsigned();
        table.foreign('autor_id').references('id').inTable('autores');
        table.timestamps(false, true);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('devocoes');
};
