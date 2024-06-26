const { Order, OrderProduct, Product } = require("../models/index");

class OrderRepository {
  async getOrders() {
    try {
      const response = await Order.findAll();
      return response;
    } catch (error) {
      console.error("Database error:", error);
      throw new Error("Database error");
    }
  }

  async getOrder(id) {
    try {
      const response = await Order.findByPk(id);
      return response;
    } catch (error) {
      console.error("Database error:", error);
      throw new Error("Database error");
    }
  }

  async createOrder(userId, status) {
    try {
      const response = await Order.create({
        userId,
        status,
      });
      return response;
    } catch (error) {
      console.error("Database error:", error);
      throw new Error("Database error");
    }
  }

  async addOrderProductsInBulk(orderProducts) {
    try {
      const response = await OrderProduct.bulkCreate(orderProducts);
      return response;
    } catch (error) {
      console.error("Database error:", error);
      throw new Error("Database error");
    }
  }

  async changeOrderStatus(orderId, status) {
    try {
      const response = await Order.update(
        { status },
        {
          where: { id: orderId },
        }
      );

      return response;
    } catch (error) {
      console.error("Database error:", error);
      throw new Error("Database error");
    }
  }

  async getOrderByUserId(userId) {
    try {
      const response = await Order.findOne({ where: { userId } });
      return response;
    } catch (error) {
      console.error("Database error:", error);
      throw new Error("Database error");
    }
  }

  async fetchOrderDetails(orderId) {
    try {
      const response = await Order.findOne({
        where: {
          id: orderId,
        },
        include: {
          model: Product,
          attributes: ["title", "id", "price", "image"],
          through: {
            model: OrderProduct,
            attributes: ["quantity"],
          },
        },
        attributes: ["id", "status", "createdAt", "updatedAt"],
      });
      return response;
    } catch (error) {
      console.error("Database error:", error);
      throw new Error("Database error");
    }
  }
}

module.exports = OrderRepository;
