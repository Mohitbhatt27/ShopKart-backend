class ProductService {
  constructor(respository) {
    this.respository = respository;
  }

  async createProduct(product) {
    try {
      const response = await this.respository.createProduct(
        product.title,
        product.description,
        product.price,
        product.image,
        product.categoryId
      );
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getProducts() {
    try {
      const response = await this.respository.getProducts();
      return response;
    } catch (error) {
      throw new Error("Error retrieving products");
    }
  }

  async getProduct(id) {
    try {
      const response = await this.respository.getProduct(id);
      return response;
    } catch (error) {
      throw new Error("Error retrieving product");
    }
  }

  async deleteProduct(id) {
    try {
      const response = await this.respository.deleteProduct(id);
      return response;
    } catch (error) {
      throw new Error("Error deleting product");
    }
  }

  async updateProduct(id, title, description, price, image, categoryId) {
    try {
      const response = await this.respository.updateProduct(
        id,
        title,
        description,
        price,
        image,
        categoryId
      );
      // if service has received 0 as response, that means the id is invalid
      if (response == 0) return null;
      return response;
    } catch (error) {
      throw new Error("Error updating product");
    }
  }
}

module.exports = ProductService;
