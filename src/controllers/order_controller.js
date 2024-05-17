const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const { OrderService } = require("../services/index");

const { OrderRepository, CartRepository } = require("../repositories/index");

const {
  handleInternalServerError,
} = require("../errors/internal_server_error");

const orderService = new OrderService(
  new OrderRepository(),
  new CartRepository()
);

async function createOrder(req, res) {
  try {
    const userId = req.user.id; // from auth middleware

    const response = await orderService.createOrder(userId);

    return res.status(StatusCodes.OK).json({
      success: true,
      message: ReasonPhrases.OK,
      error: {},
      data: response,
    });
  } catch (error) {
    if (error.message === "Products not found") {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: ReasonPhrases.NOT_FOUND,
        error: "Products not found",
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
    handleInternalServerError(res, error);
  }
}

module.exports = {
  createOrder,
};
