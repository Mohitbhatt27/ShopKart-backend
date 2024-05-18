const { StatusCodes, ReasonPhrases } = require("http-status-codes");
function signupValidator(req, res, next) {
  const requiredFields = ["email", "password"];

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
  signupValidator,
};
