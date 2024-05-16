const db = require("../config/db_config");
const Sequelize = require("sequelize");

const User = db.define(
  "user",
  {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: true,
      len: [6, 20],
      isAlphanumeric: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      isEmail: true,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = User;
