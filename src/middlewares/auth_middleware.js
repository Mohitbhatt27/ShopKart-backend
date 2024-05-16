const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const { verifyToken } = require("../utils/auth");

function isLoggedIn(req, res, next) {
  if (!req.cookies || !req.cookies.token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: ReasonPhrases.UNAUTHORIZED,
      error: "Unauthorized",
      data: {},
    });
  }
  const token = req.cookies.token;
  try {
    const decodedToken = verifyToken(token);
    req.user = { email: decodedToken.email, id: decodedToken.id };
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: ReasonPhrases.UNAUTHORIZED,
      error: "Unauthorized",
      data: {},
    });
  }
  next();
}

module.exports = {
  isLoggedIn,
};
