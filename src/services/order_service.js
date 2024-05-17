class OrderService {
  constructor(respository, cartRepository) {
    this.respository = respository;
    this.cartRepository = cartRepository;
  }

  async createOrder(userId) {
    try {
      //1. get cart
      const cart = await this.cartRepository.getCartByUserId(userId);
      if (!cart) {
        throw new Error("Cart not found");
      }

      // 2. Get products in the cart
      const products = await cart.getProducts();
      if (!products.length) {
        throw new Error("Products not found");
      }

      //3. create a new empty order
      const order = await this.respository.createOrder(userId, "pending");

      //4. get all the products in an array
      const orderProductsArray = products.map((product) => {
        return {
          orderId: order.id,
          productId: product.id,
          quantity: product.cart_product.quantity,
        };
      });

      //5. create order products
      const orderProducts = await this.respository.addOrderProductsInBulk(
        orderProductsArray
      );

      //6. update order status

      await order.update({ status: "completed" });

      //7. clearing the cart

      await this.cartRepository.clearCart(cart.id);

      return {
        orderId: order.id,
        orderProducts,
      };
    } catch (error) {
      console.error(error);
      throw new Error(error.message || "unable to create order");
    }
  }
}

module.exports = OrderService;
