const db = require("../config/db_config");
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const { SALT } = require("../config/serverConfig");

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
    hooks: {
      beforeCreate: function (user) {
        const SaltRounds = bcrypt.genSaltSync(parseInt(SALT));
        user.password = bcrypt.hashSync(user.password, SaltRounds);
      },
    },
    timestamps: false,
  }
);

module.exports = User;
