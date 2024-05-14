const express = require("express");

const categoryRouter = express.Router();

const {
  createCategory,
  getAllCategories,
  getCategory,
} = require("../../controllers/category_controller");

categoryRouter.get("/", getAllCategories);

categoryRouter.post("/", createCategory);

categoryRouter.get("/:id", getCategory);

module.exports = categoryRouter;
