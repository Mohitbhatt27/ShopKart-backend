const express = require("express");

const productRouter = express.Router();

const {
  createProduct,
  getAllProducts,
  getProduct,
} = require("../../controllers/product_controller");

const {
  createProductValidator,
} = require("../../middlewares/product_middlewares");

productRouter.get("/", getAllProducts);

productRouter.post("/", createProductValidator, createProduct);

productRouter.get("/:id", getProduct);

module.exports = productRouter;
