const { Category } = require("../models/index");
const { Sequelize } = require("sequelize"); //only to check for duplicate name

class CategoryRepository {
  async createCategory(name, description) {
    try {
      const response = await Category.create({
        name,
        description,
      });
      return response;
    } catch (error) {
      //checking for duplicate name
      if (error instanceof Sequelize.UniqueConstraintError) {
        throw new Error("Category name must be unique");
      }
      console.error("Database error:", error);
      throw new Error("Database error");
    }
  }

  async getCategories() {
    try {
      const response = await Category.findAll({
        attributes: ["name"],
      });
      return response.map((category) => category.name);
    } catch (error) {
      console.error("Database error:", error);
      throw new Error("Database error");
    }
  }

  async getCategory(id) {
    try {
      const response = await Category.findByPk(id);
      return response;
    } catch (error) {
      console.error("Database error:", error);
      throw new Error("Database error");
    }
  }

  async deleteCategory(id) {
    try {
      const response = await Category.destroy({ where: { id } });
      return response;
    } catch (error) {
      console.error("Database error:", error);
      throw new Error("Database error");
    }
  }

  async updateCategory(id, name, description) {
    const updateData = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;

    try {
      // need to check if the id is valid or not, if id is valid, the response will be 1
      const [response] = await Category.update(updateData, {
        where: { id },
      });
      return response;
    } catch (error) {
      console.error("Database error:", error);
      throw new Error("Database error");
    }
  }
}

module.exports = CategoryRepository;
