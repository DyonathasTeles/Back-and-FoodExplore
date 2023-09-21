const path = require("path")

module.exports = {
  
  development: {
    client: 'sqlite3',
    debug: true,
    connection: {
      filename: path.resolve(__dirname, "src", "database", "database.db")
    },
    useNullAsDefault: true,
    migrations: {
      directory: path.resolve(__dirname, "src", "database", "knex", "migrations")
    }
  },
};
