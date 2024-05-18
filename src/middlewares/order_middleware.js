const { StatusCodes, ReasonPhrases } = require("http-status-codes");
function updateOrderStatusValidator(req, res, next) {
  const requiredFields = ["status"];

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
  updateOrderStatusValidator,
};
