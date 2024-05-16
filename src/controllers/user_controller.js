const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const { UserService } = require("../services/index");

const { UserRepository } = require("../repositories/index");

const {
  handleInternalServerError,
} = require("../errors/internal_server_error");

const userService = new UserService(new UserRepository());

async function createUser(req, res) {
  try {
    const response = await userService.createUser(req.body);
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: ReasonPhrases.CREATED + " user successfully",
      error: {},
      data: response,
    });
  } catch (error) {
    if (error.message == "Email must be unique") {
      return res.status(StatusCodes.CONFLICT).json({
        success: false,
        message: ReasonPhrases.CONFLICT,
        error: "email already exists",
        data: {},
      });
    }
    if (error.message == "Empty required fields") {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: ReasonPhrases.BAD_REQUEST,
        error: "Required field is empty",
        data: {},
      });
    }
    if (error.message == "Invalid email address") {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: ReasonPhrases.BAD_REQUEST,
        error: "Invalid email address",
        data: {},
      });
    }
    if (error.message == "Invalid password") {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: ReasonPhrases.BAD_REQUEST,
        error:
          "Invalid password: Should be alphanumeric and at least 6 characters long",
        data: {},
      });
    }
    handleInternalServerError(res, error);
  }
}

async function getUser(req, res) {
  try {
    const response = await userService.getUser(req.params.id);
    if (!response) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: ReasonPhrases.NOT_FOUND,
        error: {},
        data: {},
      });
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

async function deleteUser(req, res) {
  try {
    const response = await userService.deleteUser(req.params.id);
    if (!response) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: ReasonPhrases.NOT_FOUND,
        error: {},
        data: {},
      });
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
  createUser,
  getUser,
  deleteUser,
};