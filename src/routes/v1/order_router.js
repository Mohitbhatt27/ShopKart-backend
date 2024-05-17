const express = require("express");

const { OrderController } = require("../../controllers/index");

const { isLoggedIn } = require("../../middlewares/auth_middleware");

const { createOrder } = OrderController;

const orderRouter = express.Router();

orderRouter.post("/", isLoggedIn, createOrder);

module.exports = orderRouter;
