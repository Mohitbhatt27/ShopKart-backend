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

  async changeOrderStatus(userId, orderId, status) {
    try {
      const order = await this.respository.getOrder(orderId);

      if (order && userId !== order.userId) {
        throw new Error("Unauthorized access");
      }

      if (!order) {
        throw new Error("Order not found");
      }

      const response = await this.respository.changeOrderStatus(
        orderId,
        status
      );
      return response;
    } catch (error) {
      console.error(error);
      throw new Error(error.message || "unable to change order status");
    }
  }

  async fetchOrderDetails(userId, orderId) {
    try {
      //1. check if order exists and the user is authorised
      const order = await this.respository.getOrder(orderId);

      if (order && userId !== order.userId) {
        throw new Error("Unauthorized access");
      }

      if (!order) {
        throw new Error("Order not found");
      }

      //2. get order products
      const response = await this.respository.fetchOrderDetails(orderId);
      let totalPrice = 0;

      const products = response.dataValues.products.map((product) => {
        totalPrice +=
          product.dataValues.price * product.order_product.dataValues.quantity;
        return {
          id: product.dataValues.id,
          title: product.dataValues.title,
          price: product.dataValues.price,
          image: product.dataValues.image,
          quantity: product.order_product.dataValues.quantity,
        };
      });

      return {
        orderId: response.dataValues.id,
        orderStatus: response.dataValues.status,
        userId: userId,
        orderDate: response.dataValues.createdAt.toDateString(),
        orderUpdateDate: response.dataValues.updatedAt.toDateString(),
        products: products,
        totalPrice: totalPrice,
      };
    } catch (error) {
      console.error(error);
      throw new Error(error.message || "unable to fetch order details");
    }
  }
}

module.exports = OrderService;
