const express = require("express");
const V1router = express.Router();

const pingRoutes = require("./ping_router_v1");
const productRoutes = require("./product_router");
const categoryRoutes = require("./category_router");
const userRoutes = require("./user_router");
const cartRoutes = require("./cart_router");

V1router.use("/ping", pingRoutes);
V1router.use("/products", productRoutes);
V1router.use("/category", categoryRoutes);
V1router.use("/user", userRoutes);
V1router.use("/cart", cartRoutes);

module.exports = V1router;
