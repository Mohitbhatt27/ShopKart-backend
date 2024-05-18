const express = require("express");

const categoryRouter = express.Router();

const { CategoryController } = require("../../controllers/index");

const {
  createCategory,
  getAllCategories,
  getCategory,
  deleteCategory,
  updateCategory,
  getProductsByCategoryId,
} = CategoryController;

const {
  createCategoryValidator,
} = require("../../middlewares/category_middleware");

categoryRouter.get("/", getAllCategories);

categoryRouter.post("/", createCategoryValidator, createCategory);

categoryRouter.get("/:id", getCategory);

categoryRouter.delete("/:id", deleteCategory);

categoryRouter.patch("/:id", updateCategory);

categoryRouter.get("/:id/products", getProductsByCategoryId);

module.exports = categoryRouter;
