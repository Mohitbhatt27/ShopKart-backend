const express = require("express");
const V1router = express.Router();

const pingRoutes = require("./ping_router_v1");
const productRoutes = require("./product_router");

V1router.use("/ping", pingRoutes);
V1router.use("/products", productRoutes);

module.exports = V1router;
