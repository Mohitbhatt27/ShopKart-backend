const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const { ProductService } = require("../services/index");

const { ProductRepository } = require("../repositories/index");

const productService = new ProductService(new ProductRepository());

const {
  handleInternalServerError,
} = require("../errors/internal_server_error");

async function createProduct(req, res) {
  try {
    const response = await productService.createProduct(req.body);
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: ReasonPhrases.CREATED + " product successfully",
      error: {},
      data: response,
    });
  } catch (error) {
    handleInternalServerError(res, error);
  }
}

async function getAllProducts(req, res) {
  try {
    const response = await productService.getProducts();
    return res.status(StatusCodes.OK).json({
      success: true,
      message: ReasonPhrases.OK,
      error: {},
      data: response,
    });
  } catch (error) {
    handleInternalServerError(res, error);
  }
}

async function getProduct(req, res) {
  try {
    const id = req.params.id;
    const response = await productService.getProduct(id);
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
    handleInternalServerError(res, error);
  }
}

async function deleteProduct(req, res) {
  try {
    const id = req.params.id;
    const response = await productService.deleteProduct(id);
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
    handleInternalServerError(res, error);
  }
}

async function updateProduct(req, res) {
  try {
    const id = req.params.id;
    const { title, description, price, image, categoryId } = req.body;
    const response = await productService.updateProduct(
      id,
      title,
      description,
      price,
      image,
      categoryId
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
    handleInternalServerError(res, error);
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  getProduct,
  deleteProduct,
  updateProduct,
};
