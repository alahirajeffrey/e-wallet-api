require("dotenv").config();
const mysql = require('mysql')

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host: process.env.MYSQL_DEV_HOST,
      user: process.env.MYSQL_DEV_USER,
      password: process.env.MYSQL_DEV_PASSWORD,
      database: process.env.MYSQL_DEV_DATABASE
    },
    migrations: {
      directory: "./database"
    },
    seeds: {
      directory: "./database/seeds"
    }
  },

  production: {
    client: 'mysql',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      ssl: { rejectUnauthorized: false },
    },
    migrations: {
      directory: __dirname + "/database"
    },
    seeds: {
      directory: __dirname + "/db/seeds"
    }
  },
};
