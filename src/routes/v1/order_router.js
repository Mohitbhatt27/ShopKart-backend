const express = require("express");

const { OrderController } = require("../../controllers/index");

const { isLoggedIn } = require("../../middlewares/auth_middleware");

const { createOrder, changeOrderStatus, fetchOrderDetails } = OrderController;

const orderRouter = express.Router();

orderRouter.post("/", isLoggedIn, createOrder);
orderRouter.patch("/:orderId", isLoggedIn, changeOrderStatus);
orderRouter.get("/:orderId", isLoggedIn, fetchOrderDetails);

module.exports = orderRouter;
