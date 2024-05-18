const express = require("express");

const { OrderController } = require("../../controllers/index");

const { isLoggedIn } = require("../../middlewares/auth_middleware");
const {
  updateOrderStatusValidator,
} = require("../../middlewares/order_middleware");

const { createOrder, changeOrderStatus, fetchOrderDetails } = OrderController;

const orderRouter = express.Router();

orderRouter.post("/", isLoggedIn, createOrder);
orderRouter.patch(
  "/:orderId",
  isLoggedIn,
  updateOrderStatusValidator,
  changeOrderStatus
);
orderRouter.get("/:orderId", isLoggedIn, fetchOrderDetails);

module.exports = orderRouter;
