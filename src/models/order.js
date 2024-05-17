const db = require("../config/db_config");
const Sequelize = require("sequelize");

const Order = db.define("order", {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "users",
      key: "id",
    },
  },
  status: {
    type: Sequelize.ENUM("pending", "completed", "cancelled"),
    defaultValue: "pending",
    allowNull: false,
  },
});

module.exports = Order;
