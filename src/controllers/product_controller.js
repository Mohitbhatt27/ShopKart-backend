const { StatusCodes, ReasonPhrases } = require("http-status-codes");

function createProduct(req, res) {
  try {
    res.status(StatusCodes.CREATED).json({
      success: true,
      message: ReasonPhrases.CREATED + " product successfully",
      error: {},
      data: {
        id: Math.floor(Math.random() * 1000),
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        image: req.body.image,
      },
    });
  } catch (error) {
    console.log("Something went wrong", error);
  }
}

module.exports = {
  createProduct,
};
