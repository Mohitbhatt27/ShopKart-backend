const db = require("../config/db_config");
const Sequelize = require("sequelize");

const OrderProducts = db.define("order_product", {
  productId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "products",
      key: "id",
    },
  },
  orderId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "orders",
      key: "id",
    },
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});

module.exports = OrderProducts;
