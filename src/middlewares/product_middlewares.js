function createProductValidator(req, res, next) {
  const requiredFields = ["title", "price", "description", "category", "image"];

  for (const field of requiredFields) {
    if (!req.body[field]) {
      return res.status(400).json({
        success: false,
        message: `${field} is required`,
        data: {},
        error: {
          message: `${field} is missing`,
        },
      });
    }
  }
  next();
}

module.exports = {
  createProductValidator,
};
