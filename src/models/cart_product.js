const db = require("../config/db_config");
const Sequelize = require("sequelize");

const Cartproduct = db.define("cart_product", {
  productId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "products",
      key: "id",
    },
  },
  cartId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "carts",
      key: "id",
    },
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});

module.exports = Cartproduct;
