
exports.up = function(knex) {
    return knex.schema.createTable('autores', function(table) {
        table.increments('id').primary().unsigned();
        table.text('biografia').notNullable();
        table.string('avatar', 20);
        table.integer('usuario_id').notNullable().unsigned();
        table.foreign('usuario_id').references('id').inTable('usuarios').onDelete('CASCADE');
        table.timestamps(true, true);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('autores');
};
