// Update with your config settings.

module.exports = {

    development: {
      client: 'mysql2',
      connection: {
        // preciseTimestamps: false,
        host: '127.0.0.1',
        database: 'startpodia',
        user:     'root',
        password: 'n43r1l'
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        directory: './src/database/migrations',
        tableName: 'knex_migrations'
      }
    },
  
    test: {
      client: 'mysql2',
      connection: {
        preciseTimestamps: false,
        host: '127.0.0.1',
        database: 'startpodia',
        user:     'root',
        password: 'n43r1l'
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        directory: './src/database/migrations',
        tableName: 'knex_migrations'
      }
    },
  
    staging: {
      client: 'postgresql',
      connection: {
        database: 'my_db',
        user:     'username',
        password: 'password'
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        tableName: 'knex_migrations'
      }
    },
  
    production: {
      client: 'postgresql',
      connection: {
        database: 'my_db',
        user:     'username',
        password: 'password'
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        tableName: 'knex_migrations'
      }
    }
  
  };
  