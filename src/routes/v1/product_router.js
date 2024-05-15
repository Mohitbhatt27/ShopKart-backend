const express = require("express");

const productRouter = express.Router();

const {
  createProduct,
  getAllProducts,
  getProduct,
  deleteProduct,
  updateProduct,
} = require("../../controllers/product_controller");

const {
  createProductValidator,
} = require("../../middlewares/product_middlewares");

productRouter.get("/", getAllProducts);

productRouter.post("/", createProductValidator, createProduct);

productRouter.get("/:id", getProduct);

productRouter.patch("/:id", updateProduct);

productRouter.delete("/:id", deleteProduct);

module.exports = productRouter;
