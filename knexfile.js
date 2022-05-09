require("dotenv").config();
const mysql = require('mysql')

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host: process.env.MYSQL_DEV_HOST,
      port: process.env.MYSQL_DEV_PORT,
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
};
