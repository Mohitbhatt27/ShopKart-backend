const Sequelize = require("sequelize");

const {
  DB_NAME,
  DB_USER,
  DB_PASS,
  DB_URL,
  DB_PORT,
  NODE_ENV,
} = require("../config/serverConfig");

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_URL,
  dialect: "mysql",
  port: NODE_ENV == "production" ? DB_PORT : 3306,
});

module.exports = sequelize;
