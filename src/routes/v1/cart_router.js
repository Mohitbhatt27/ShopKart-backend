const express = require("express");

const cartRouter = express.Router();

const { CartController } = require("../../controllers/index");

const { updateCart } = CartController;

const { isLoggedIn } = require("../../middlewares/auth_middleware");

cartRouter.patch("/:id", isLoggedIn, updateCart);

module.exports = cartRouter;
