const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const CategoryService = require("../services/category_service");

const CategoryRepository = require("../repositories/category_repository");

const categoryService = new CategoryService(new CategoryRepository());

async function createCategory(req, res) {
  try {
    const response = await categoryService.createCategory(req.body);
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: ReasonPhrases.CREATED + " category successfully",
      error: {},
      data: response,
    });
  } catch (error) {
    console.log("Something went wrong", error);
  }
}

async function getAllCategories(req, res) {
  try {
    const response = await categoryService.getCategories();
    return res.status(StatusCodes.OK).json({
      success: true,
      message: ReasonPhrases.OK,
      error: {},
      data: response,
    });
  } catch (error) {
    console.log("Something went wrong", error);
  }
}

async function getCategory(req, res) {
  try {
    const id = req.params.id;
    const response = await categoryService.getCategory(id);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: ReasonPhrases.OK,
      error: {},
      data: response,
    });
  } catch (error) {
    console.log("Something went wrong", error);
  }
}

module.exports = {
  createCategory,
  getAllCategories,
  getCategory,
};
