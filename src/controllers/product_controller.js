const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const ProductService = require("../services/product_service");

function createProduct(req, res) {
  try {
    const response = ProductService.createProduct(req.body);
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: ReasonPhrases.CREATED + " product successfully",
      error: {},
      data: response,
    });
  } catch (error) {
    console.log("Something went wrong", error);
  }
}

function getAllProducts(req, res) {
  try {
    const response = ProductService.getProducts();
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

function getProduct(req, res) {
  try {
    const id = req.params.id;
    const response = ProductService.getProduct(id);
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
  createProduct,
  getAllProducts,
  getProduct,
};
