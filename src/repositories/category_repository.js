const categoryModel = require("../models/category");

class CategoryRepository {
  async createCategory(name, description) {
    try {
      const response = await categoryModel.create({
        name,
        description,
      });
      return response;
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

  async getCategories() {
    try {
      const response = await categoryModel.findAll({
        attributes: ["name"],
      });
      return response.map((category) => category.name);
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

  async getCategory(id) {
    try {
      const response = await categoryModel.findByPk(id);
      return response;
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

  async deleteCategory(id) {
    try {
      const response = await categoryModel.destroy({ where: { id } });
      return response;
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

  async updateCategory(id, name, description) {
    const updateData = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;

    try {
      const response = await categoryModel.update(updateData, {
        where: { id },
      });
      return response;
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }
}

module.exports = CategoryRepository;
