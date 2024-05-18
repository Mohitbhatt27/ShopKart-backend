const express = require("express");
const V1router = express.Router();

const pingRoutes = require("./ping_router_v1");
const productRoutes = require("./product_router");
const categoryRoutes = require("./category_router");
const userRoutes = require("./user_router");
const cartRoutes = require("./cart_router");
const orderRoutes = require("./order_router");

V1router.use("/ping", pingRoutes);
V1router.use("/products", productRoutes);
V1router.use("/categories", categoryRoutes);
V1router.use("/users", userRoutes);
V1router.use("/carts", cartRoutes);
V1router.use("/orders", orderRoutes);

module.exports = V1router;
