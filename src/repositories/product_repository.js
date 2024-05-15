const { Product } = require("../models/index");

class ProductRepository {
  async createProduct(title, description, price, image, categoryId) {
    try {
      const response = await Product.create({
        title,
        description,
        price,
        image,
        categoryId,
      });
      return response;
    } catch (error) {
      console.error("Database error:", error);
      throw new Error("Database error");
    }
  }

  async getProducts({ limit, offset }, order) {
    try {
      console.log("limit", limit, "offset", offset, "order", order);
      const response = await Product.findAll({
        limit,
        offset,
        order: [["title", order]],
      });
      return response;
    } catch (error) {
      console.error("Database error:", error);
      throw new Error("Database error");
    }
  }

  async getProduct(id) {
    try {
      const response = await Product.findByPk(id);
      return response;
    } catch (error) {
      console.error("Database error:", error);
      throw new Error("Database error");
    }
  }

  async deleteProduct(id) {
    try {
      const response = await Product.destroy({ where: { id } });
      return response;
    } catch (error) {
      console.error("Database error:", error);
      throw new Error("Database error");
    }
  }

  async updateProduct(id, title, description, price, image, categoryId) {
    const updateData = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (price) updateData.price = price;
    if (image) updateData.image = image;
    if (categoryId) updateData.categoryId = categoryId;

    try {
      // need to check if the id is valid or not, if id is valid, the response will be 1
      const [response] = await Product.update(updateData, {
        where: { id },
      });
      return response;
    } catch (error) {
      console.error("Database error:", error);
      throw new Error("Database error");
    }
  }

  async getProductsByCategoryId(categoryId) {
    try {
      const response = await Product.findAll({
        where: { categoryId },
      });
      return response;
    } catch (error) {
      console.error("Database error:", error);
      throw new Error("Database error");
    }
  }
}

module.exports = ProductRepository;
