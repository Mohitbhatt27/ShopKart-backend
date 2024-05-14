const db = require("../config/db_config");
const Sequelize = require("sequelize");

const Category = db.define("category", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = Category;
