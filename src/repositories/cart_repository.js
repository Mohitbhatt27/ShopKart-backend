const { Cart, CartProduct } = require("../models/index");

class CartRepository {
  async createCart(userId) {
    try {
      const response = await Cart.create({ userId });
      return response;
    } catch (error) {
      console.error("Database error:", error);
      throw new Error("Database error");
    }
  }

  async getCart(id) {
    try {
      const response = await Cart.findByPk(id);
      return response;
    } catch (error) {
      console.error("Database error:", error);
      throw new Error("Database error");
    }
  }

  async deleteCart(id) {
    try {
      const response = await Cart.destroy({ where: { id } });
      return response;
    } catch (error) {
      console.error("Database error:", error);
      throw new Error("Database error");
    }
  }

  async getCarts() {
    try {
      const response = await Cart.findAll();
      return response;
    } catch (error) {
      console.error("Database error:", error);
      throw new Error("Database error");
    }
  }

  async updateCart(cartId, productId, toBeAdded = true) {
    try {
      /**
       * we need to first check if the product is already in the cart
       * for that, we will get the through table - CartProduct Model, and check if
       * there exists a row with the productId and cartId
       * if exists, that means the product is already there in the cart
       */

      const result = await CartProduct.findOne({
        where: { productId, cartId },
      });

      if (toBeAdded) {
        // we want to add a product in the cart
        if (!result) {
          // product is not there in the cart
          await CartProduct.create({ productId, cartId });
        } else {
          // product is already there in the cart
          await result.increment({ quantity: 1 });
        }
      }

      if (!toBeAdded) {
        if (!result) {
          // product is not there in the cart, so we can't remove it
          throw new Error("Product is not in the cart");
        } else if (result.quantity === 1) {
          // we want to remove the product from the cart
          await CartProduct.destroy({ where: { productId, cartId } });
        } else {
          // we want to decrease the quantity of the product
          await result.decrement({ quantity: 1 });
        }
      }

      // not we will be returning the updated cart

      const response = await CartProduct.findAll({
        where: { cartId },
      });

      return {
        cartId,
        products: response,
      };
    } catch (error) {
      console.error("Database error:", error);
      throw new Error("Database error");
    }
  }
}

module.exports = CartRepository;
