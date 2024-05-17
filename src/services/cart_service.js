class CartService {
  constructor(respository, productRepository) {
    this.respository = respository;
    this.productRepository = productRepository;
  }

  async updateCart(userId, cartId, productId, toBeAdded = true) {
    // here the first parameter -> userId is received from auth middleware
    try {
      toBeAdded = toBeAdded == true || toBeAdded == "true" ? true : false;

      // check if the cart exists
      const cart = await this.respository.getCart(cartId);
      if (!cart) {
        throw new Error("Cart not found");
      }
      // check if the product exists
      const product = await this.productRepository.getProduct(productId);
      if (!product) {
        throw new Error("Product not found");
      }

      // check if the cart belongs to this user
      if (cart.userId != userId) {
        throw new Error("Cart does not belong to this user");
      }

      const response = await this.respository.updateCart(
        cartId,
        productId,
        toBeAdded
      );
      return response;
    } catch (error) {
      console.error(error);
      throw new Error(error.message || "Error updating cart");
    }
  }
}

module.exports = CartService;
