const express = require("express");

const categoryRouter = express.Router();

const {
  createCategory,
  getAllCategories,
  getCategory,
  deleteCategory,
} = require("../../controllers/category_controller");

categoryRouter.get("/", getAllCategories);

categoryRouter.post("/", createCategory);

categoryRouter.get("/:id", getCategory);

categoryRouter.delete("/:id", deleteCategory);

module.exports = categoryRouter;
