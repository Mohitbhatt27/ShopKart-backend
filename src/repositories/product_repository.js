const { Op } = require("sequelize");
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

  async getProducts(limit, offset, order, min, max) {
    console.log(limit, offset, order, min, max);
    try {
      const minPrice = min ? min : Number.MIN_SAFE_INTEGER;
      const maxPrice = max ? max : Number.MAX_SAFE_INTEGER;
      const orderClause = order ? [["title", order]] : [["title", "ASC"]];
      const response = await Product.findAll({
        where: {
          price: {
            [Op.between]: [minPrice, maxPrice],
          },
        },
        limit,
        offset,
        order: orderClause,
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
