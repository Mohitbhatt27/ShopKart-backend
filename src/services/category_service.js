const NotFoundError = require("../errors/not_found_error");
const InternalServer = require("../errors/internal_server_error");

class CategoryService {
  constructor(respository) {
    this.respository = respository;
  }

  async createCategory(category) {
    try {
      const response = await this.respository.createCategory(
        category.name,
        category.description
      );
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getCategories() {
    try {
      const response = await this.respository.getCategories();
      return response;
    } catch (error) {
      throw new Error("Error retrieving categories");
    }
  }

  async getCategory(id) {
    try {
      const response = await this.respository.getCategory(id);
      return response;
    } catch (error) {
      throw new Error("Error retrieving category");
    }
  }

  async deleteCategory(id) {
    try {
      const response = await this.respository.deleteCategory(id);
      return response;
    } catch (error) {
      throw new Error("Error deleting category");
    }
  }

  async updateCategory(id, name, description) {
    try {
      const response = await this.respository.updateCategory(
        id,
        name,
        description
      );
      // if service has received 0 as response, that means the id is invalid
      if (response == 0) return null;
      return response;
    } catch (error) {
      throw new Error("Error updating category");
    }
  }
}

module.exports = CategoryService;
