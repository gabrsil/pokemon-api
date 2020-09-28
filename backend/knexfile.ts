// Update with your config settings.

module.exports = {

    client: 'sqlite3',
    connection: {
      filename: './src/infrastructure/database/dev.sqlite3'
    },
    migrations: {
      directory: './src/infrastructure/database/migrations'
    },
    seeds: {
      directory: './src/infrastructure/database/seeds'
    },

    useNullAsDefault: true,
};
