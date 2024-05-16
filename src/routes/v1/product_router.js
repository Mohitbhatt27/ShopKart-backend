const express = require("express");

const productRouter = express.Router();

const { ProductController } = require("../../controllers/index");

const {
  createProduct,
  getAllProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  searchProduct,
} = ProductController;

const {
  createProductValidator,
} = require("../../middlewares/product_middlewares");

productRouter.get("/", getAllProducts);

productRouter.post("/", createProductValidator, createProduct);

productRouter.get("/search", searchProduct);

productRouter.get("/:id", getProduct);

productRouter.patch("/:id", updateProduct);

productRouter.delete("/:id", deleteProduct);

module.exports = productRouter;
