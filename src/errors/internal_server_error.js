const { StatusCodes, ReasonPhrases } = require("http-status-codes");

function handleInternalServerError(res, error) {
  console.error(error);
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
}

module.exports = {
  handleInternalServerError,
};
