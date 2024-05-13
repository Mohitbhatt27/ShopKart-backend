const express = require("express");

const productRouter = express.Router();

const { createProduct } = require("../../controllers/product_controller");

const {
  createProductValidator,
} = require("../../middlewares/product_middlewares");

productRouter.get("/", (req, res) => {
  return res.json({ products: [] });
});

productRouter.post("/", createProductValidator, createProduct);

module.exports = productRouter;
