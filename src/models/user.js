const db = require("../config/db_config");
const Sequelize = require("sequelize");

const User = db.define(
  "user",
  {
    username: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [6, 20],
        isAlphanumeric: true,
      },
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
  },
  {
    timestamps: false,
  }
);

module.exports = User;
