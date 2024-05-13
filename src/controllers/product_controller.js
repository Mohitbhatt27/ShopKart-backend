function createProduct(req, res) {
  try {
    res.json({
      success: true,
      message: "Successfully created a product",
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
