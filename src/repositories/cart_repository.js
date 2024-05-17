const { Cart } = require("../models/index");

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
}

module.exports = CartRepository;
