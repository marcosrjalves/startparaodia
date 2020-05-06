
exports.up = function(knex, Promise) {
  return knex.schema.createTable('usuarios', function(table) {
      table.increments('id').primary().unsigned();
      table.string('nome', 100).notNullable();
      table.datetime('data_nasc').nullable();
      table.string('email').notNullable().unique();
      table.string('password_hash').notNullable();
      table.timestamps(false, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('usuarios');
};