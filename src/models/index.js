const Category = require("./category");
const Product = require("./product");
const User = require("./user");
const Cart = require("./cart");
const CartProduct = require("./cart_product");

Product.belongsTo(Category, { foreignKey: "categoryId" });

Category.hasMany(Product, { foreignKey: "categoryId" });

User.hasOne(Cart);
Cart.belongsTo(User, { foreignKey: "userId" });

Cart.belongsToMany(Product, { through: CartProduct });
Product.belongsToMany(Cart, { through: CartProduct });

module.exports = { Category, Product, User, Cart, CartProduct };
