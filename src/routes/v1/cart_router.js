const express = require("express");

const cartRouter = express.Router();

const { CartController } = require("../../controllers/index");

const { updateCart, clearCart, getCartProducts } = CartController;

const { isLoggedIn } = require("../../middlewares/auth_middleware");

cartRouter.patch("/:id", isLoggedIn, updateCart);

cartRouter.delete("/:id", isLoggedIn, clearCart);

cartRouter.get("/:id/products", isLoggedIn, getCartProducts);

module.exports = cartRouter;
