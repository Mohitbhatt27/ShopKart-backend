const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const { CartService } = require("../services/index");

const { CartRepository, ProductRepository } = require("../repositories/index");

const {
  handleInternalServerError,
} = require("../errors/internal_server_error");

const cartService = new CartService(
  new CartRepository(),
  new ProductRepository()
);

async function updateCart(req, res) {
  try {
    const cartId = req.params.id;
    const userId = req.user.id; // from auth middleware
    const { productId, toBeAdded } = req.body;
    const response = await cartService.updateCart(
      userId,
      cartId,
      productId,
      toBeAdded
    );

    return res.status(StatusCodes.OK).json({
      success: true,
      message: ReasonPhrases.OK,
      error: {},
      data: response,
    });
  } catch (error) {
    if (error.message === "Product not found") {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: ReasonPhrases.NOT_FOUND,
        error: "Product not found",
        data: {},
      });
    }

    if (error.message === "Cart not found") {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: ReasonPhrases.NOT_FOUND,
        error: "Cart not found",
        data: {},
      });
    }

    if (error.message === "Cart does not belong to this user") {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: ReasonPhrases.UNAUTHORIZED,
        error: "Cart does not belong to this user",
        data: {},
      });
    }
    handleInternalServerError(res, error);
  }
}

module.exports = {
  updateCart,
};
