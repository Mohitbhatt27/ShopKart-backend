const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const CategoryService = require("../services/index");

const {
  CategoryRepository,
  ProductRepository,
} = require("../repositories/index");

const categoryService = new CategoryService(
  new CategoryRepository(),
  new ProductRepository()
);

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
    if (error.message === "Category name must be unique") {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ message: ReasonPhrases.CONFLICT });
    }
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
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
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
}

async function getCategory(req, res) {
  try {
    const id = req.params.id;
    const response = await categoryService.getCategory(id);
    if (!response) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: ReasonPhrases.NOT_FOUND });
    }
    return res.status(StatusCodes.OK).json({
      success: true,
      message: ReasonPhrases.OK,
      error: {},
      data: response,
    });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
}

async function deleteCategory(req, res) {
  try {
    const id = req.params.id;
    const response = await categoryService.deleteCategory(id);
    if (!response) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: ReasonPhrases.NOT_FOUND });
    }
    return res.status(StatusCodes.OK).json({
      success: true,
      message: ReasonPhrases.OK,
      error: {},
      data: response,
    });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
}

async function updateCategory(req, res) {
  try {
    const id = req.params.id;
    const { name, description } = req.body;
    const response = await categoryService.updateCategory(
      id,
      name,
      description
    );

    if (!response) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: ReasonPhrases.NOT_FOUND });
    }
    return res.status(StatusCodes.OK).json({
      success: true,
      message: ReasonPhrases.OK,
      error: {},
      data: response,
    });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
}

async function getProductsByCategoryId(req, res) {
  try {
    const id = req.params.id;
    const response = await categoryService.getProductsByCategoryId(id);
    if (!response) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: ReasonPhrases.NOT_FOUND });
    }
    return res.status(StatusCodes.OK).json({
      success: true,
      message: ReasonPhrases.OK,
      error: {},
      data: response,
    });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
}

module.exports = {
  createCategory,
  getAllCategories,
  getCategory,
  deleteCategory,
  updateCategory,
  getProductsByCategoryId,
};
