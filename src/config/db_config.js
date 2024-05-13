const Sequelize = require("sequelize");

const { DB_NAME, DB_USER, DB_PASS, DB_URL } = require("../config/serverConfig");

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
