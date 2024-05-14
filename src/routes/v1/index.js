const express = require("express");
const V1router = express.Router();

const pingRoutes = require("./ping_router_v1");
const productRoutes = require("./product_router");
const categoryRoutes = require("./category_router");

V1router.use("/ping", pingRoutes);
V1router.use("/products", productRoutes);
V1router.use("/category", categoryRoutes);

module.exports = V1router;
