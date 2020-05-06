
exports.up = function(knex) {
    return knex.schema.createTable('autores', function(table) {
        table.increments('id').primary().unsigned();
        table.string('nome', 100).notNullable();
        table.text('biografia').notNullable();
        table.string('avatar', 20);
        table.timestamps(false, true);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('autores');
};
