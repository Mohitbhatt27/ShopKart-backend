const express = require("express");

const categoryRouter = express.Router();

const {
  createCategory,
  getAllCategories,
  getCategory,
  deleteCategory,
  updateCategory,
  getProductsByCategoryId,
} = require("../../controllers/category_controller");

const {
  createCategoryValidator,
} = require("../../middlewares/category_validator");

categoryRouter.get("/", getAllCategories);

categoryRouter.post("/", createCategoryValidator, createCategory);

categoryRouter.get("/:id", getCategory);

categoryRouter.delete("/:id", deleteCategory);

categoryRouter.patch("/:id", updateCategory);

categoryRouter.get("/:id/products", getProductsByCategoryId);

module.exports = categoryRouter;
