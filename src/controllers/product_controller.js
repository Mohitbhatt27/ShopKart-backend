const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const ProductService = require("../services/product_service");

const FakeStoreRepository = require("../repositories/fake_store_repository");

const productService = new ProductService(new FakeStoreRepository());

function createProduct(req, res) {
  try {
    const response = productService.createProduct(req.body);
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
    console.log("Something went wrong", error);
  }
}

async function getProduct(req, res) {
  try {
    const id = req.params.id;
    const response = await productService.getProduct(id);
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
