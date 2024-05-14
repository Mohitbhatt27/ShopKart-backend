class CategoryService {
  constructor(respository) {
    this.respository = respository;
  }

  async createCategory(category) {
    const response = await this.respository.createCategory(
      category.name,
      category.description
    );
    return response;
  }

  async getCategories() {
    const response = await this.respository.getCategories();
    return response;
  }

  async getCategory(id) {
    const response = await this.respository.getCategory(id);
    return response;
  }

  async deleteCategory(id) {
    const response = await this.respository.deleteCategory(id);
    return response;
  }

  async updateCategory(id, name, description) {
    const response = await this.respository.updateCategory(
      id,
      name,
      description
    );
    return response;
  }
}

module.exports = CategoryService;
