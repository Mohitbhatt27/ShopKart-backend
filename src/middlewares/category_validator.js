const { StatusCodes, ReasonPhrases } = require("http-status-codes");
function createCategoryValidator(req, res, next) {
  const requiredFields = ["name", "description"];

  for (const field of requiredFields) {
    if (!req.body[field]) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: ReasonPhrases.BAD_REQUEST,
        data: {},
        error: {
          message: `${field} is missing in the request body`,
        },
      });
    }
  }
  next();
}

module.exports = {
  createCategoryValidator,
};
