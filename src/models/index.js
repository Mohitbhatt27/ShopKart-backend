const Category = require("./category");
const Product = require("./product");
const User = require("./user");
const Cart = require("./cart");
const CartProduct = require("./cart_product");
const Order = require("./order");
const OrderProduct = require("./order_product");

const { DB_FORCE, DB_ALTER } = require("../config/serverConfig");

async function syncDbInOrder() {
  await Category.sync({ force: DB_FORCE, alter: DB_ALTER });
  await Product.sync({ force: DB_FORCE, alter: DB_ALTER });
  await User.sync({ force: DB_FORCE, alter: DB_ALTER });
  await Cart.sync({ force: DB_FORCE, alter: DB_ALTER });
  await Order.sync({ force: DB_FORCE, alter: DB_ALTER });
  await CartProduct.sync({ force: DB_FORCE, alter: DB_ALTER });
  await OrderProduct.sync({ force: DB_FORCE, alter: DB_ALTER });
}

Product.belongsTo(Category, { foreignKey: "categoryId" });

Category.hasMany(Product, { foreignKey: "categoryId" });

User.hasOne(Cart);
Cart.belongsTo(User, { foreignKey: "userId" });

Cart.belongsToMany(Product, { through: CartProduct });
Product.belongsToMany(Cart, { through: CartProduct });

Order.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Order, { foreignKey: "userId" });

Order.belongsToMany(Product, { through: OrderProduct });
Product.belongsToMany(Order, { through: OrderProduct });

module.exports = {
  Category,
  Product,
  User,
  Cart,
  CartProduct,
  Order,
  OrderProduct,
  syncDbInOrder,
};
