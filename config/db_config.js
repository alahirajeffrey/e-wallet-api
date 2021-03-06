const knex = require("knex")
const knexConfig = require("../knexfile")
require("dotenv").config();

const environment = process.env.DB_ENV || "development"

module.exports = knex(knexConfig[environment])